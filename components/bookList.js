"use client"; 
import { useState } from "react";
import BookCard from "./bookCard";

export default function BookList({ initialBooks }) {
  const [books, setBooks] = useState(initialBooks);

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Моя полиця</h1>
          <p className="text-muted-foreground">
            {books.length} {books.length === 1 ? "книга" : "книги"} в колекції
          </p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">Ваша полиця пуста😔</p>
            <p className="text-muted-foreground">Додайте книгу, щоб розпочати!</p>
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
