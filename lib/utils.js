import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function isInvalidText(text) {
    return !text || text.trim().length === 0;
}

function cn(...inputs) {
    return twMerge(clsx(inputs));
}


function normalizeAuthorName(name) {
    return name.trim().replace(/\s+/g, ' ');
}


async function findAuthor(db, name) {
    const res = await db.query(
        "SELECT id FROM authors WHERE LOWER(full_name) = LOWER($1)",
        [name]
    );
    return res.rows[0] || null;
}

async function createAuthor(db, name) {
    const res = await db.query(
        `INSERT INTO authors (full_name)
         VALUES ($1)
         RETURNING id`,
        [name]
    );
    return res.rows[0];
}

function prepareBooks(books) {
    const map = new Map();

    books.forEach(book => {
        const title = book.volumeInfo?.title?.trim().toLowerCase();
        if (title && !map.has(title)) {
            map.set(title, book);
        }
    });

    const uniqueBooks = Array.from(map.values());

    uniqueBooks.sort((a, b) => {
        const aHasImage = a.volumeInfo.imageLinks?.smallThumbnail ? 1 : 0;
        const bHasImage = b.volumeInfo.imageLinks?.smallThumbnail ? 1 : 0;
        return bHasImage - aHasImage;
    });

    return uniqueBooks;
}

function formatPublisherName(name) {
    const namesToExclude = ['Видавництво', 'Publisher', 'Book'];

    for (const word of namesToExclude) {
        name = name.replace(word, "");
    }

    name = name.trim();

    return name
}

export {
    isInvalidText,
    cn,
    normalizeAuthorName,
    findAuthor,
    createAuthor,
    prepareBooks,
    formatPublisherName,
}

