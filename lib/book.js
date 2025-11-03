"use server";

import { promises as fs } from "fs";
import path from "path";

export async function insertBook(bookData) {
  console.log(process.cwd());
  const filePath = path.join(process.cwd(), "data", "books.json");

  // Read existing data
  let existing = [];
  try {
    const data = await fs.readFile(filePath, "utf8");
    existing = JSON.parse(data);
  } catch {
    existing = [];
  }

  // Add new record
  existing.push(bookData);

  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

  return { message: "Form saved successfully!" };
}
