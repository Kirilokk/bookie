
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function processBookCover(inputBuffer) {
    return sharp(inputBuffer)
        .resize(300, 450, {
            fit: "cover",
            position: "centre",
        })
        .toFormat("webp", {
            quality: 80,
        })
        .toBuffer();
}

async function uploadBookCover(buffer, key) {
    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: buffer,
            ContentType: "image/webp",
            CacheControl: "public, max-age=31536000, immutable",
        })
    );
}

async function downloadImage(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to download image: ${res.status}`);
    }
    return Buffer.from(await res.arrayBuffer());
}

export async function addBookWithCover(imageUrl, bookId) {
    const rawImage = await downloadImage(imageUrl);
    const processed = await processBookCover(rawImage);
    const coverKey = `images/${bookId}/cover.webp`;
    await uploadBookCover(processed, coverKey);
    return coverKey;
}