import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marckarimi -- An AI Deep Research Platform",
  description: "Explore multiple perspectives on complex topics through AI-powered deep research models",
  keywords: ["AI research", "deep research", "multiple perspectives", "AI analysis", "Marckarimi"],
  authors: [{ name: "Marckarimi Team" }],
  creator: "Marckarimi",
  publisher: "Marckarimi",
  openGraph: {
    title: "Marckarimi -- AI Deep Research Platform",
    description: "Explore multiple perspectives on complex topics through AI-powered deep research models",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marckarimi -- AI Deep Research Platform",
    description: "Explore multiple perspectives on complex topics through AI-powered deep research models",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
