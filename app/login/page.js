
'use client'
import { Library, Mail, Lock, Book, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement auth
        console.log("Login:", { email, password });
    };

    return (
        <div className="flex items-center justify-center flex-1 p-4">
            <Card className="w-full max-w-md mb-50">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Library className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">З поверненням!</CardTitle>
                    <CardDescription>Увійдіть в свою бібліотеку</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Пошта</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <BookOpen className="h-4 w-4" />
                                    ) : (
                                        <Book className="h-4 w-4" />
                                    )}

                                </button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full">
                            Увійти
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                            Не маєте акаунт?{" "}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Зареєструватись
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
