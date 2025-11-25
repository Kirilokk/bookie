"use server";
import { pool } from './server/db.js';
import { normalizeAuthorName, findAuthor, createAuthor } from './utils.js';


export async function getAllBooks() {

  try {
    const result = await pool.query(
      `SELECT 
        books.id,
        books.title,
        books.status,
        books.cover_color,
        books.image_url,
        authors.full_name AS author
      FROM books
      JOIN authors ON authors.id = books.author_id
      ORDER BY books.id DESC;`,
    )
    return result.rows;
  }
  catch (error) {
    console.error("Помилка під час вибірки книг", error);
  }
}

export async function getBookById(book_id) {

  try {
    const result = await pool.query(
      `SELECT 
        books.id,
        books.title,
        books.status,
        books.cover_color,
        books.image_url,
        authors.full_name AS author
      FROM books
      JOIN authors ON authors.id = books.author_id
      WHERE books.id = $1
      ORDER BY books.id DESC;`, [book_id]
    )
    return result.rows[0];
  }
  catch (error) {
    console.error(`Помилка під час вибірки книги з ідентифікатором ${book_id}`, error);
  }
}

export async function setBookStatus(book_id, book_status) {
  try {
    await pool.query(
      `UPDATE books
     SET status = $1
     WHERE id = $2 `, [book_status, book_id]);
    return { success: true, newStatus: book_status };
  }
  catch (error) {
    console.error("Помилка оновлення статусу книги:", error);
    return { success: false, error: "Не вдалося оновити статус книги. Спробуйте пізніше" };
  }
}

export async function deleteBookById(book_id) {

  try {
    await pool.query(
      `DELETE FROM books
    WHERE id = $1;`, [book_id]);
    return { success: true };
  }
  catch (error) {
    console.error("Помилка під час видалення книги", error);
    return { success: false, error: "Не вдалося видалити книгу. Спробуйте, будь ласка, пізніше" };
  }
}

export async function insertBook(bookData) {

  try {
    const authorId = await getOrCreateAuthor(bookData.author);
    const result = await pool.query(
      `INSERT INTO books (title, author_id, status, cover_color, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`, [bookData.title, authorId, bookData.status, bookData.coverColor, bookData.image]);

    return { success: true, data: result.rows[0].id };
  }
  catch (error) {
    return { success: false, error: "Не вдалося додати книгу. Спробуйте, будь ласка, пізніше" };
  }
}

async function getOrCreateAuthor(rawName) {
  const name = normalizeAuthorName(rawName);

  // 1. Try to find
  const existing = await findAuthor(pool, name);
  if (existing) return existing.id;

  // 2. Create new
  const created = await createAuthor(pool, name);
  return created.id;
}