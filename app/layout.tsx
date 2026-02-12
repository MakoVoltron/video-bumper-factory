import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { APP } from "../lib/constants";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Button from "@/components/ui/Button";
import { signOut } from "@/lib/actions/auth";
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
  title: APP.NAME,
  description: APP.DESCRIPTION,
  metadataBase: new URL(APP.URL),
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

  console.log("session");
  console.log(session);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headlineFont.variable} antialiased`}
      >
        <Providers>
          <AdminProvider value={{ isAdmin }}>
            <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 font-sans dark:bg-black ">
              {session && <AdminNavbar />}
              {/* <main className="flex w-full flex-col items-center"></main> */}

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
