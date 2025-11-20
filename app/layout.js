import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";



export const metadata = {
  title: "Bookie",
  description: "Your personal book collection manager.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation/> 
        {children}
        </body>
    </html>
  );
}
