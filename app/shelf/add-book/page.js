"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addBook } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use_toast";
import { Search, Plus, Loader2 } from "lucide-react";
import { prepareBooks, formatPublisherName } from "@/lib/utils";


export default function AddNewBook() {
    const { toast } = useToast();
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        if (query.length < 5) {
            setResults([]);
            setSelectedBook(null);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}&maxResults=10`
                );
                const data = await response.json();

                const uniqueBooks = prepareBooks(data.items || []);

                console.log('Unique books ' + uniqueBooks)

                setResults(uniqueBooks || []);
            } catch (error) {
                console.error("Error fetching books:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };


    const handleAddBook = () => {
        if (!selectedBook) return;
        console.log(selectedBook.volumeInfo)


        toast({
            title: "Книга успішно додана!",
            description: `"${selectedBook.volumeInfo.title}" додана до вашої полиці.`,
        });

        router.push("/shelf");
    };

    return (
        <>
            <main className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-3xl font-bold text-foreground mb-8">Додати нову книгу</h1>
                <div className="space-y-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Знайти книгу (введіть щонайменше 5 символів)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10 bg-background"
                        />
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    )}

                    {!isLoading && results.length > 0 && (
                        <div className="space-y-2">
                            {results.map((book) => (
                                <Card
                                    key={book.id}
                                    className={`p-6 cursor-pointer transition-all ${selectedBook?.id === book.id
                                        ? "ring-2 ring-primary bg-primary/5"
                                        : "hover:bg-muted/50"
                                        }`}
                                    onClick={() => handleSelectBook(book)}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-foreground">{book.volumeInfo.title}</p>
                                            {book.volumeInfo.authors && (
                                                <p className="text-sm text-muted-foreground">
                                                    {book.volumeInfo.authors?.join(", ")}
                                                </p>
                                            )}
                                            {book.volumeInfo.publisher && (
                                                <p className="text-sm text-muted-foreground">
                                                    <b>Видавництво:</b> {formatPublisherName(book.volumeInfo.publisher)}
                                                </p>
                                            )}
                                        </div>
                                        {book.volumeInfo.imageLinks?.smallThumbnail && (
                                            <img
                                                src={book.volumeInfo.imageLinks.smallThumbnail}
                                                alt={book.volumeInfo.title}

                                                className="w-16 h-26 object-cover rounded shadow-sm flex-shrink-0"

                                            />
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {query.length >= 5 && !isLoading && results.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">Нічого не знайдено</p>
                    )}

                    {selectedBook && (
                        <Button
                            onClick={handleAddBook}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Додати книгу
                        </Button>
                    )}
                </div>
            </main>
        </>
    );
}
