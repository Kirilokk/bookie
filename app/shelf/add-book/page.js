"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { addBook } from "@/lib/actions";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function AddNewBook() {
    const router = useRouter();
    const [state, formAction] = useActionState(addBook, { message: null });
    const [selectStatus, setSelectStatus] = useState("");

    return (
        <>
            <main className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-3xl font-bold text-foreground mb-8">Додати нову книгу</h1>

                <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-6'>
                    <form action={formAction} className='space-y-6'>
                        <div className='space-y-2'>
                            <p>
                                <Label htmlFor='book-name'>Назва</Label>

                                <Input type="text" name="book-name" />
                            </p>
                            <p>
                                <Label htmlFor='book-author'>Автор</Label>
                                <Input type="text" name="book-author" />
                            </p>
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="status">Статус читання</Label>
                            <Select value={selectStatus} onValueChange={setSelectStatus}>

                                <SelectTrigger id="status" className="bg-background">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="to_read">Прочитати</SelectItem>
                                    <SelectItem value="in_reading">Читаю</SelectItem>
                                    <SelectItem value="read">Прочитано</SelectItem>
                                </SelectContent>
                            </Select>

                            <input type="hidden" name="book-status" value={selectStatus} />
                        </div>


                        {state.message && <p>{state.message}</p>}
                        <div className='flex gap-3'>
                            <Button className='flex-1'>Додати</Button>
                            <Button
                                variant='outline'
                                onClick={() => { router.push("/shelf"); }}
                            >Відміна</Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
