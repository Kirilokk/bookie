"use server";
import sql from 'better-sqlite3';

const db = sql('books.db');

export async function getAllMBooks() {
    return db.prepare('SELECT * FROM books').all();
}


export async function insertBook(bookData) {
  db.prepare(`
    INSERT INTO books (title, author, status, coverColor, image)
    VALUES (@title, @author,
            @status, @coverColor, @image)
  `).run(bookData);
}