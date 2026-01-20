"use server";
import { generateBookColor, getISBN } from "@/lib/utils";
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
        coverColor: generateBookColor(bookData.id, bookData.volumeInfo.title),
        api_book_id: bookData.id,
        image: null
    };
    // Set image: default or uploaded
    const thumbnail = bookData.volumeInfo?.imageLinks;

    if (thumbnail) {
        bookItem.image = await addBookWithCover(bookData.id);
    }


    const result = await insertBook(bookItem);

    return result.success
        ? { success: true, data: result.data }
        : { success: false, message: result.error };
}

