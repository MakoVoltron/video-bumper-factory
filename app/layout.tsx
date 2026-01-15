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

  console.log("session");
  console.log(session);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headlineFont.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-50 font-sans dark:bg-black ">
            {session && (
              <div className="fixed top-0 left-0 z-50 py-3 px-10 bg-purple-900 w-full text-center flex justify-between items-center">
                <div>YOU ARE LOGGED IN AS ADMIN</div>
                <div>
                  <form action={signOut}>
                    <Button text="Logout" size="sm" />
                  </form>
                </div>
              </div>
            )}
            <main className="flex w-full flex-col items-center"></main>
            <AuthToast />
            {children}
            <ToastContainer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
