import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Suspense } from "react";
import { APP } from "../lib/constants";
import { ToastContainer } from "react-toastify";
import AuthToast from "@/components/helpers/AuthToast";
import Providers from "./providers";
import { AdminProvider } from "@/lib/context/AdminContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const headlineFont = localFont({
  src: "../fonts/MomoTrustDisplay-Regular.ttf",
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: {
    default: APP.NAME,
    template: `%s | ${APP.NAME}`,
  },
  description: APP.DESCRIPTION,
  metadataBase: new URL(APP.URL),

  keywords: [
    "business logo animation",
    "animated logo",
    "logo bumper",
    "video bumper",
    "YouTube intro",
    "TikTok logo animation",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: APP.NAME,
    title: APP.NAME,
    description: APP.DESCRIPTION,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: APP.NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP.NAME,
    description: APP.DESCRIPTION,
    images: ["/images/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
        <Providers>
          {/*
            isAdmin is hard-coded false here so the public site renders
            statically (no per-request session lookup). Admin UI lives in the
            dashboard segment layout, which overrides this with isAdmin=true.
          */}
          <AdminProvider value={{ isAdmin: false }}>
            <main className="flex flex-col md:min-h-screen justify-center items-center  font-sans bg-black ">
              {/* AuthToast reads useSearchParams; the Suspense boundary keeps
                  the rest of the page statically renderable. */}
              <Suspense fallback={null}>
                <AuthToast />
              </Suspense>
              {children}
              <ToastContainer />
            </main>
          </AdminProvider>
        </Providers>
      </body>
    </html>
  );
}
