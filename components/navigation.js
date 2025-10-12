'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Plus, Library } from "lucide-react";

export default function Navigation() {
    const currentPath = usePathname();

    const isActive = (path) => currentPath === path;
    return (
        <nav className="border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
                        <Library className="h-6 w-6" />
                        <span className="font-semibold text-lg">Bookie</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/shelf"
                            className={`flex items-center gap-2 transition-colors ${isActive("/")
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <BookOpen className="h-4 w-4" />
                            <span>Полиця</span>
                        </Link>

                        <Link
                            href="/shelf/add-book"
                            className={`flex items-center gap-2 transition-colors ${isActive("/add-book")
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                           <Plus className="h-4 w-4" />
                            <span>Додати книгу</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}