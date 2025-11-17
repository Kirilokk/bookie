"use server";
import { getClient } from './server/db.js';
import { normalizeAuthorName, findAuthor, createAuthor } from './utils.js';


export async function getAllMBooks() {
  const client = getClient();
   const query = `
    SELECT 
      books.id,
      books.title,
      books.status,
      books.cover_color,
      books.image_url,
      authors.full_name AS author
    FROM books
    JOIN authors ON authors.id = books.author_id
    ORDER BY books.id DESC;
  `;


  try {
    await client.connect();
    const res = await client.query(query);
    return res.rows;
  } finally {
    await client.end();
  }
}

export async function getBook(book_id) {
  console.log(book_id)
  const client = getClient();
const query = `
    SELECT 
      books.id,
      books.title,
      books.status,
      books.cover_color,
      books.image_url,
      authors.full_name AS author
    FROM books
    JOIN authors ON authors.id = books.author_id
    WHERE books.id = $1
    ORDER BY books.id DESC;
  `;


  try {
    await client.connect();
    const res = await client.query(query, [book_id]);
    return res.rows[0];
  } finally {
    await client.end();
  }
}




export async function insertBook(bookData) {
  const client = getClient();

  try {
    await client.connect();

    const authorId = await getOrCreateAuthor(client, bookData.author);


    const res = await client.query(`
  INSERT INTO books (title, author_id, status, cover_color, image_url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
`, [bookData.title, authorId, bookData.status, bookData.coverColor, bookData.image]);

    return res.rows[0].id;
  } finally {
    await client.end();
  }
}

async function getOrCreateAuthor(client, rawName) {
  const name = normalizeAuthorName(rawName);

  // 1. Try to find
  const existing = await findAuthor(client, name);
  if (existing) return existing.id;

  // 2. Create new
  const created = await createAuthor(client, name);
  return created.id;
}