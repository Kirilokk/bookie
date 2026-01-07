"use server";
import { getRandomHSL, getISBN } from "@/lib/utils";
import { insertBook } from "@/lib/book";
import { addBookWithCover } from "./image";


export async function addBook(bookData) {

    const bookItem = {
        id: crypto.randomUUID(),
        title: bookData.title,
        author: bookData.authors?.join(", "),
        status: 'to_read',
        publisher: bookData.publisher || null,
        page_count: bookData.pageCount || null,
        isbn: getISBN(bookData.industryIdentifiers) || null,
        coverColor: getRandomHSL(),
        image: null // will be set below
    };

    // Set image: default or uploaded
    if (bookData.imageLinks?.thumbnail) {
        bookItem.image = await addBookWithCover(bookData.imageLinks.thumbnail, bookData.title);
    } else {
        bookItem.image = "images/default.jpg";
        bookItem.coverColor = 'hsl(0 0% 100%)'
    }


    console.log("Adding book:", bookItem);
    const result = await insertBook(bookItem);

    return result.success
        ? { success: true, data: result.data }
        : { success: false, message: result.error };
}

