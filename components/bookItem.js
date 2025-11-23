'use client';
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { statusLabels } from "@/lib/constants.js";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use_toast";
import { setBookStatus, deleteBookById } from "@/lib/book";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export default function BookItem({ book }) {
    const [status, setStatus] = useState(book?.status || "to_read");
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    if (!book) {
        return redirect("/shelf");
    }

    function handleStatusChange(newStatus) {
        if (isPending || newStatus === status) return;

        const previousStatus = status;

        // Set optimistically new status
        setStatus(newStatus);

        startTransition(async () => {
            const result = await setBookStatus(book.id, newStatus);

            if (result.success) {
                toast({
                    title: "Статус оновлено",
                    description: `Книга позначена як ${statusLabels[newStatus].toLowerCase()}`,
                });
            }
            else {
                setStatus(previousStatus);
                toast({
                    title: "Помилка оновлення",
                    description: result.error || "Не вдалося зберегти статус.",
                    variant: "destructive",
                });
            }
        })
    }

    function handleDelete() {
        if (isPending) return;

        startTransition(async () => {
            const result = await deleteBookById(book.id);

            if (result.success) {
                toast({
                    title: "Книгу видалено",
                    description: `"${book.title}" прибрана з полиці`,
                });
                redirect("/shelf");
            }
            else {
                toast({
                    title: "Помилка під час видалення",
                    description: result.error || "Не вдалося видалити книгу.",
                });
            }
        })
    }


    return (
        <div className="min-h-screen bg-background">

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center gap-2 mb-6">
                    <Button

                        onClick={() => { redirect("/shelf"); }}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Назад до полиці
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Видалити цю книгу?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ви впевнені, що хочете прибрати <b>"{book.title}"</b>? Це незворотня дія.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Відміна</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Видалити
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
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

