"use server";
import { getISBN } from "@/lib/utils";
import { insertBook } from "@/lib/book";
import { redirect } from "next/navigation";


export async function addBook(bookData) {
    bookData = {
        title: bookData.title,
        author: bookData.authors?.join(", "),
        status: 'to_read',
        publisher: bookData.publisher,
        page_count: bookData.pageCount,
        isbn: getISBN(bookData.industryIdentifiers)
    };

    // Generate uid and fill other test fields
    bookData.id = crypto.randomUUID();
    bookData.image = "images/default.jpg";
    bookData.coverColor = "hsl(0 0% 100%)";


    console.log("Adding book:", bookData);
    const result = await insertBook(bookData);

    return result.success
        ? { success: true, data: result.data }
        : { success: false, message: result.error };
}

