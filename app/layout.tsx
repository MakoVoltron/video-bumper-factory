import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { APP } from "../lib/constants";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ToastContainer } from "react-toastify";
import AuthToast from "@/components/helpers/AuthToast";
import Providers from "./providers";
import AdminNavbar from "@/components/admin/AdminNavbar";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAdmin = session?.user.role === "ADMIN";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headlineFont.variable} antialiased`}
      >
        <Providers>
          <AdminProvider value={{ isAdmin }}>
            <div className="flex flex-col min-h-screen justify-center items-center  font-sans bg-black ">
              {session && <AdminNavbar />}

              <AuthToast />
              {children}
              <ToastContainer />
            </div>
          </AdminProvider>
        </Providers>
      </body>
    </html>
  );
}
