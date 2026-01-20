import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function isInvalidText(text) {
    return !text || text.trim().length === 0;
}

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}


export function normalizeName(name) {
    return name.trim().replace(/\s+/g, ' ');
}


export async function findAuthor(db, name) {
    const res = await db.query(
        "SELECT id FROM authors WHERE LOWER(full_name) = LOWER($1)",
        [name]
    );
    return res.rows[0] || null;
}


export async function findPublisher(db, name) {
    const res = await db.query(
        "SELECT id FROM publishers WHERE LOWER(full_name) = LOWER($1)",
        [name]
    );
    return res.rows[0] || null;
}

export async function createISBNs(db, book_id, isbn) {
    if (!isbn) return null

    const isbn13 = convertToISBN13(isbn);

    try {
        await db.query('BEGIN');

        await db.query(
            `INSERT INTO book_isbns (book_id, type, value)
            VALUES ($1, 'ISBN_10', $2)`,
            [book_id, isbn]
        );


        await db.query(
            `INSERT INTO book_isbns (book_id, type, value)
            VALUES ($1, 'ISBN_13', $2)`,
            [book_id, isbn13]
        );
    } catch (err) {
        await db.query('ROLLBACK');
        throw err;
    }
}

function convertToISBN13(isbn10) {
    const ISBN13_PREFIX = '978'

    const core = ISBN13_PREFIX + isbn10.slice(0, -1);

    let sum = 0;
    for (let i = 0; i < core.length; i++) {
        const digit = Number(core[i]);
        if (isNaN(digit)) throw new Error(`Invalid digit at position ${i}: ${core[i]}`);
        const weight = i % 2 === 0 ? 1 : 3;
        sum += digit * weight;
    }

    const checkDigit = (10 - (sum % 10)) % 10;

    return core + checkDigit;

}




export async function createAuthor(db, name) {
    const res = await db.query(
        `INSERT INTO authors (full_name)
         VALUES ($1)
         RETURNING id`,
        [name]
    );
    return res.rows[0];
}

export async function createPublisher(db, name) {
    const res = await db.query(
        `INSERT INTO publishers (full_name)
         VALUES ($1)
         RETURNING id`,
        [name]
    );
    return res.rows[0];
}

export function prepareBooks(books) {
    const map = new Map();

    books.forEach(book => {
        if (book.volumeInfo?.language == "ru") return;
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

export function formatPublisherName(name) {
    const namesToExclude = ['Видавництво', 'Publisher', 'Book'];

    for (const word of namesToExclude) {
        name = name.replace(word, "");
    }

    name = name.trim();

    return name
}

export function getISBN(industryIdentifiers = []) {
    return industryIdentifiers.find(i => i.type === "ISBN_10")?.identifier || null;
}

export function generateBookColor(bookId, bookTitle) {
    const hash = hashBook(bookId + bookTitle)

    const hue = 120 + (hash % 50); // 120-170 range
    const saturation = 30 + (hash % 25); // 30-55%
    const lightness = 55 + (hash % 17); // 55-72%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function hashBook(bookString) {
    let hash = 0;
    for (let i = 0; i < bookString.length; i++) {
        const char = bookString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

