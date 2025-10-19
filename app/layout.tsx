import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/lib/booking-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CleanAuto - Lavage automobile à domicile",
  description: "Service professionnel de lavage automobile à domicile. Écologique, rapide et sans engagement.",
  keywords: ["lavage auto", "nettoyage voiture", "service à domicile", "écologique"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
