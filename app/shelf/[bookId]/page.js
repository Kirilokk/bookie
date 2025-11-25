
import BookItem from "@/components/bookItem";
import { getBookById } from "@/lib/book";

export default async function Book({ params }) {
    const { bookId } = await params;

    const book = await getBookById(bookId);


    return <BookItem book={book} />
};