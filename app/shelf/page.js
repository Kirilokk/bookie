import fs from "fs/promises";
import path from "path";
import BookList from "@/components/bookList";

export default async function BookShelf() {
  const filePath = path.join(process.cwd(), "data", "books.json");
  const data = await fs.readFile(filePath, "utf8");
  const books = JSON.parse(data);


  return <BookList initialBooks={books} />;
};




