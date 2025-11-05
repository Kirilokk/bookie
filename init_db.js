const sql = require('better-sqlite3');
const db = sql('books.db');

const dummyBooks = 
[
  {
    "id": "1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "status": "read",
    "coverColor": "hsl(145, 55%, 75%)",
        "image": "images/the-great-gatsby.jpg"
  },
  {
    "id": "2",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "status": "in_progress",
    "coverColor": "hsl(160, 45%, 70%)",
    "image": "images/to-kill-mockbird.jpg"
  },
  {
    "id": "3",
    "title": "1984",
    "author": "George Orwell",
    "status": "to_read",
    "coverColor": "hsl(130, 40%, 65%)",
    "image": "images/george-orwell-1984.jpg"
  },
  {
    "title": "test",
    "author": "test",
    "status": "to_read",
    "id": "379bc105-187f-47bb-9dce-f430a79a818b",
    "image": "images/default.jpg",
    "coverColor": "hsl(0 0% 100%)"
  },
  {
    "title": "saf",
    "author": "fasf",
    "status": "in_progress",
    "id": "15d5cc59-803c-4885-bc8d-dfe73ec003ba",
    "image": "images/default.jpg",
    "coverColor": "hsl(0 0% 100%)"
  },
  {
    "title": "Щось там",
    "author": "Щось там",
    "status": "in_progress",
    "id": "c898d16c-f68c-406d-8348-dff95f62fe8c",
    "image": "images/default.jpg",
    "coverColor": "hsl(0 0% 100%)"
  },
  {
    "title": "Якась книга",
    "author": "іафі",
    "status": "in_progress",
    "id": "e75754a8-8d00-43dc-a959-d5b7015fa6ae",
    "image": "images/default.jpg",
    "coverColor": "hsl(0 0% 100%)"
  }
];

db.prepare(`
   CREATE TABLE IF NOT EXISTS books (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       author TEXT NOT NULL,
       status TEXT NOT NULL,
       coverColor TEXT NOT NULL,
       image TEXT NOT NULL
   )
`).run();

function initData() {
  const stmt = db.prepare(`
      INSERT INTO books (title, author, status, coverColor, image)
      VALUES (@title, @author,
              @status, @coverColor, @image)
   `);

  for (const book of dummyBooks) {
    stmt.run(book);
  }
}

console.log('Loading initial data...');
initData();
