"use server";
import { getRandomHSL, getISBN } from "@/lib/utils";
import { insertBook } from "@/lib/book";
import { addBookWithCover } from "./image";


export async function addBook(bookData) {

    const bookItem = {
        id: crypto.randomUUID(),
        title: bookData.volumeInfo.title,
        author: bookData.volumeInfo.authors?.join(", "),
        status: 'to_read',
        publisher: bookData.volumeInfo.publisher || null,
        page_count: bookData.volumeInfo.pageCount || null,
        isbn: getISBN(bookData.volumeInfo.industryIdentifiers) || null,
        coverColor: getRandomHSL(),
        api_book_id: bookData.id,
        image: null
    };

    // Set image: default or uploaded
    if (bookData.volumeInfo.imageLinks?.thumbnail) {
        bookItem.image = await addBookWithCover(bookData.volumeInfo.imageLinks.thumbnail, bookData.volumeInfo.title);
    } else {
        bookItem.image = "images/default.jpg";
        bookItem.coverColor = 'hsl(0 0% 100%)'
    }


    const result = await insertBook(bookItem);

    return result.success
        ? { success: true, data: result.data }
        : { success: false, message: result.error };
}

