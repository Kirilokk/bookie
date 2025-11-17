
import BookItem from "@/components/bookItem";
import { getBook } from "@/lib/book";

export default async function Book({params}) {
    const { bookId } = await params;

    const book = await getBook(bookId);


    return <BookItem book={book}/>
};