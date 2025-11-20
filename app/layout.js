import "./globals.css";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";


export const metadata = {
  title: "Bookie",
  description: "Your personal book collection manager.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation/> 
        <Toaster />
        {children}
        </body>
    </html>
  );
}
