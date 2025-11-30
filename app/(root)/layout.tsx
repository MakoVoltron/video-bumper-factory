import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { APP } from "../lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const headlineFont = localFont({
  src: "./fonts/MomoTrustDisplay-Regular.ttf",
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: APP.NAME,
  description: APP.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headlineFont.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 font-sans dark:bg-black ">
          {/* <main className="flex w-full flex-col items-center">
            </main> */}
          {children}
        </div>
      </body>
    </html>
  );
}
