import Link from "next/link";
import Image from "next/image";
import Badge from "./ui/badge.js";
import { statusLabels } from "../app/books.js";

const S33_BUCKET_URL = 'https://kirilok-nextjs-demo-users-image.s3.eu-north-1.amazonaws.com/';

const statusColors = {
    to_read: "bg-muted text-muted-foreground border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    in_progress: "bg-accent/20 text-accent border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    read: "bg-primary/20 text-primary border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
};

export default function BookCard({ book }) {
    return (
        <Link href={`shelf/book${book.id}`}>
            <div className="group bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div
                    className="w-full h-48 rounded-md mb-4 flex items-center justify-center text-card-foreground/60 font-medium transition-transform group-hover:scale-105"
                    style={{ backgroundColor: book.coverColor }}
                >
                    <Image
                        src={`${S33_BUCKET_URL}${book.image}`}
                        alt={book.title}
                        width={100}
                        height={150}
                        className="object-contain max-h-full"
                    />
                </div>

                <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{book.author}</p>


                <Badge className={`${statusColors[book.status]} border-0`}>
                    {statusLabels[book.status]}
                </Badge>


            </div>
        </Link>
    );
};