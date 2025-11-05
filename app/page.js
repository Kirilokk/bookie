import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { BookOpen, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";
import BookCard from "@/components/bookCard";
import Badge from "@/components/ui/badge";
import { getAllMBooks } from "@/lib/book";

export default async function Home() {
  const books = await getAllMBooks();
  const totalBooks = books.length;
  const readBooks = books.filter(book => book.status === "read").length;
  const favoriteGenres = ["Fiction", "Classic", "Philosophy"];

  // Get last 3 added books for "Recently Added" section
  const recentBooks = books.slice(0, 3);
  
  // Mock recommendations
  const recommendations = books.filter(book => book.status === "to_read");

const dailyQuote = {
  text: "A room without books is like a body without a soul.",
  author: "Marcus Tullius Cicero",
};

 return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Вітаємо в Bookie</h1>
          <p className="text-muted-foreground">Ваша персональна бібліотека</p>
        </div>

        <div className="grid gap-8">
          {/* Daily Quote */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Цитата на сьогодні
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-foreground mb-2">
                "{dailyQuote.text}"
              </blockquote>
              <p className="text-sm text-muted-foreground">— {dailyQuote.author}</p>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Всього книг</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  {totalBooks}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Прочитані книги</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  {readBooks}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Олюблені жанри</CardDescription>
                <CardContent className="pt-4 px-0 pb-0">
                  <div className="flex flex-wrap gap-2">
                    {favoriteGenres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>

          {/* Recently Added Books */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground">Нещодавно додані</h2>
              <Link 
                href="/shelf" 
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Переглянути усі →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-foreground">Що прочитати далі?</h2>
            </div>
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recommendations.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground text-xl">
                    Рекомендацй немає &#128531;. Додайте книги з статусом "Прочитати" щоб побачити рекомендації!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
