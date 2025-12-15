"use server";
import { pool } from './server/db.js';
import { normalizeName, findAuthor, createAuthor, createPublisher, findPublisher, createISBNs } from './utils.js';


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
  // Create author data
  const authorId = await getOrCreateAuthor(bookData.author);
  // Create publisher data
  const publisherId = await getOrCreatePublisher(bookData.publisher);
  // Create isbn data

  // Connect to guarantee same DB connection
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO books (title, author_id, publisher_id, page_count, status, cover_color, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`, [bookData.title, authorId, publisherId, bookData.page_count, bookData.status, bookData.coverColor, bookData.image]);

    const book_id = result.rows[0].id;

    await createISBNs(client, book_id, bookData.isbn)
    await client.query("COMMIT");
    return { success: true, data: result.rows[0].id };
  }
  catch (error) {
    console.log('Error happened while saving book', error)
    await client.query("ROLLBACK");
    return { success: false, error: "Не вдалося додати книгу. Спробуйте, будь ласка, пізніше" };
  }
}

async function getOrCreateAuthor(rawName) {
  const name = normalizeName(rawName);

  const existing = await findAuthor(pool, name);
  if (existing) return existing.id;

  // 2. Create new
  const created = await createAuthor(pool, name);
  return created.id;
}


async function getOrCreatePublisher(rawName) {
  console.log('Publisher name: ', rawName)
  const name = normalizeName(rawName);

  const existing = await findPublisher(pool, name);
  if (existing) return existing.id;

  const created = await createPublisher(pool, name);
  return created.id;
}