'use client';
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/button";
import { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { statusLabels } from "@/lib/constants.js";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use_toast";

export default function BookItem({ book }) {
    const [status, setStatus] = useState(book?.status || "to_read");
    const { toast } = useToast();

    if (!book) {
        return redirect("/shelf");
    }

    function handleStatusChange(newStatus) {
        setStatus(newStatus);
        toast({
            title: "Статус оновлено",
            description: `Книга позначена як ${statusLabels[newStatus].toLowerCase()}`,
        });
    }

    return (
        <div className="min-h-screen bg-background">

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Button
                    variant="ghost"
                    onClick={() => { redirect("/shelf"); }}
                    className="mb-6 -ml-2"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Назад до полиці
                </Button>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div
                            className="w-full aspect-[2/3] rounded-lg flex items-center justify-center text-3xl font-bold text-card-foreground/60"
                            style={{ backgroundColor: book.cover_color }}
                        >
                            <Image
                                src={`https://${process.env.NEXT_PUBLIC_REMOTE_IMAGE_HOST}/${book.image_url}`}
                                alt={book.title}
                                width={100}
                                height={150}
                                className="object-contain max-h-full"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">{book.title}</h1>
                            <p className="text-lg text-muted-foreground">{book.author}</p>
                        </div>
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Статус читання</h2>
                            <div className="space-y-3">
                                <Button
                                    variant={status === "to_read" ? "default" : "outline"}
                                    className="w-full justify-start"
                                    onClick={() => handleStatusChange("to_read")}
                                >
                                    Прочитати
                                </Button>
                                <Button
                                    variant={status === "in_reading" ? "default" : "outline"}
                                    className="w-full justify-start"
                                    onClick={() => handleStatusChange("in_reading")}
                                >
                                    Читаю
                                </Button>
                                <Button
                                    variant={status === "read" ? "default" : "outline"}
                                    className="w-full justify-start"
                                    onClick={() => handleStatusChange("read")}
                                >
                                    Прочитано
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};