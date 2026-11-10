import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alex — Interdisciplinary Creative",
    template: "%s — Alex",
  },
  description:
    "Alex is an interdisciplinary creative based in New York City, working across photography, design, technology, and experimental media.",
};

export const viewport: Viewport = {
  themeColor: "#F2F0EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-paper text-ink antialiased`}>
        <a href="#content" className="skip-link kicker">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
