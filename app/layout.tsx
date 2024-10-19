import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/app/lib/nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Realtalk",
  description: "Real-time talks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen`}
      >
        <Nav />
        <main className="w-screen h-full pt-16 bg-slate-950">{children}</main>
      </body>
    </html>
  );
}
