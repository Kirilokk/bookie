import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function isInvalidText(text) {
    return !text || text.trim().length === 0;
}

function cn(...inputs) {
    return twMerge(clsx(inputs));
}


function normalizeName(name) {
    return name.trim().replace(/\s+/g, ' ');
}


async function findAuthor(db, name) {
    const res = await db.query(
        "SELECT id FROM authors WHERE LOWER(full_name) = LOWER($1)",
        [name]
    );
    return res.rows[0] || null;
}


async function findPublisher(db, name) {
    const res = await db.query(
        "SELECT id FROM publishers WHERE LOWER(full_name) = LOWER($1)",
        [name]
    );
    return res.rows[0] || null;
}

async function createISBNs(db, book_id, isbn) {
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




async function createAuthor(db, name) {
    const res = await db.query(
        `INSERT INTO authors (full_name)
         VALUES ($1)
         RETURNING id`,
        [name]
    );
    return res.rows[0];
}

async function createPublisher(db, name) {
    const res = await db.query(
        `INSERT INTO publishers (full_name)
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

function getISBN(industryIdentifiers = []) {
    return industryIdentifiers.find(i => i.type === "ISBN_10")?.identifier || null;
}

function getRandomHSL() {
    const hue = Math.floor(Math.random() * (150 - 120 + 1)) + 120;       // green hue
    const saturation = Math.floor(Math.random() * (70 - 30 + 1)) + 30;   // moderate
    const lightness = Math.floor(Math.random() * (70 - 35 + 1)) + 35;    // avoid too dark/light
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export {
    createISBNs,
    getRandomHSL,
    getISBN,
    isInvalidText,
    cn,
    normalizeName,
    findPublisher,
    findAuthor,
    createAuthor,
    createPublisher,
    prepareBooks,
    formatPublisherName,
}

