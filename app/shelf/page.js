import BookList from "@/components/bookList";
import { getAllMBooks } from "@/lib/book";

export default async function BookShelf() {
  const books = await getAllMBooks();

  return <BookList initialBooks={books} />;
};




