import Link from "next/link";


const statusLabels = {
  to_read: "To Read",
  in_progress: "In Progress",
  read: "Read",
};


export default function BookCard({ book }) {
    return (
        <Link href={`shelf/book${book.id}`}>
            <div className="group bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div
                    className="w-full h-48 rounded-md mb-4 flex items-center justify-center text-card-foreground/60 font-medium transition-transform group-hover:scale-105"
                    style={{ backgroundColor: book.coverColor }}
                >
                    {book.title.substring(0, 1)}
                </div>

                <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

                <p>
                    {statusLabels[book.status]}
                </p>
            </div>
        </Link>
    );
};