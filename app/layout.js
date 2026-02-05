import "./globals.css";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/scrollTop";

export const metadata = {
  title: "Bookie",
  description: "Your personal book collection manager.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <ScrollToTop />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
