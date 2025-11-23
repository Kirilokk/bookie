"use server";
import { isInvalidText } from "@/lib/utils";
import { insertBook } from "@/lib/book";
import { redirect } from "next/navigation";

import { getClient } from "./server/db";

export async function addBook(prevState, formData) {
    const client = getClient();
    await client.connect();

    const bookData = {
        title: formData.get("book-name"),
        author: formData.get("book-author"),
        status: formData.get("book-status"),
    };
    console.log(formData);
    // Validation step
    if (isInvalidText(bookData.status) ||
        isInvalidText(bookData.author) ||
        isInvalidText(bookData.title)) {
        return { message: "Йой, всі поля мають бути заповнені!" };
    }

    // Generate uid and fill other test fields
    bookData.id = crypto.randomUUID();
    bookData.image = "images/default.jpg";
    bookData.coverColor = "hsl(0 0% 100%)";


    console.log("Adding book:", bookData);
    await insertBook(bookData);
    redirect("/shelf");

    return { message: "Книга успішно додана!" };
}

