import BookList from "@/components/bookList";
import { getAllBooks } from "@/lib/book";

export default async function BookShelf() {
  const books = await getAllBooks();

  return <BookList initialBooks={books} />;
};




