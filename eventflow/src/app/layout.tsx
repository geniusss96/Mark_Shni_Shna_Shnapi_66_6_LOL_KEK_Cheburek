import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventFlow - Modern Event Management",
  description: "Discover and register for amazing events. Premium event management solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen relative`}>
        {/* Ambient background blur elements for glassmorphism */}
        <div className="pointer-events-none fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
        <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] mix-blend-screen" />
        
        <Navbar />
        <main className="pt-24 pb-16 relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
