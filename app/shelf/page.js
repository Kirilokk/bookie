'use client';
import { useState } from "react";
import BookCard from "@/components/bookCard";

const initialBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "read",
    coverColor: "hsl(145, 55%, 75%)",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "in_progress",
    coverColor: "hsl(160, 45%, 70%)",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    status: "to_read",
    coverColor: "hsl(130, 40%, 65%)",
  },
];

export default function BookShelf() {
  const [books] = useState(initialBooks);

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Shelf</h1>
          <p className="text-muted-foreground">
            {books.length} {books.length === 1 ? "book" : "books"} in your collection
          </p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">Your shelf is empty</p>
            <p className="text-muted-foreground">Add your first book to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};




