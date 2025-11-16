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

export {
  isInvalidText,
  cn,
  normalizeAuthorName,
  findAuthor,
  createAuthor
}