import Link from "next/link";
import Image from "next/image";
import Badge from "./ui/badge.js";
import { statusLabels } from "../app/books.js";


const statusColors = {
  to_read: "bg-muted text-muted-foreground",
  in_reading: "bg-accent/20 text-accent",
  read: "bg-primary/20 text-primary",
};

export default function BookCard({ book }) {
    return (
        <Link href={`shelf/book${book.id}`}>
            <div className="group bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div
                    className="w-full h-48 rounded-md mb-4 flex items-center justify-center text-card-foreground/60 font-medium transition-transform group-hover:scale-105"
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

                <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{book.author}</p>


                <Badge className={`${statusColors[book.status]} border-0`}>
                    {statusLabels[book.status]}
                </Badge>


            </div>
        </Link>
    );
};