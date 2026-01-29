import Link from "next/link";
import Image from "next/image";
import Badge from "./ui/badge.js";
import { statusLabels } from "@/lib/constants.js";


const statusColors = {
    to_read: "bg-muted text-muted-foreground",
    in_reading: "bg-accent/20 text-accent",
    read: "bg-primary/20 text-primary",
};

export default function BookCard({ book, size = "default" }) {

    const isSmall = size === "small";
    return (
        <Link href={`shelf/${book.id}`}>
            <div className={`group bg-card border border-border rounded-xl hover:shadow-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 ${isSmall ? "p-3" : "p-4"}`}>
                <div
                    className={`relative aspect-[2/3] overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-500 ${isSmall ? "mb-3" : "mb-4"}`}
                    style={{ backgroundColor: book.cover_color }}
                >
                    {book.image_url ? (
                        <img
                            src={`https://${process.env.NEXT_PUBLIC_REMOTE_IMAGE_HOST}/${book.image_url}`}
                            alt={book.title}

                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center text-center text-xl font-semibold text-white/90 transition-transform group-hover:scale-105 p-3 leading-tight"
                        >
                            <span className="line-clamp-4">{book.title}</span>
                        </div>
                    )
                    }
                </div>

                <h3 className={`font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors ${isSmall ? "text-xs" : "text-sm"}`}>
                    {book.title}
                </h3>
                <p className={`text-sm text-muted-foreground mb-3 ${isSmall ? "text-[10px] mb-2" : "text-xs mb-3"}`}>{book.author}</p>


                <Badge className={`${statusColors[book.status]} border-0 ${isSmall ? "text-[10px] px-2 py-0.5" : "text-xs"}`}>
                    {statusLabels[book.status]}
                </Badge>


            </div>
        </Link>
    );
};