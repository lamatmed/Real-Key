import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Navbar from "./_components/Navbar";
import ConnectUserToConvext from "./ConnectUserToConvext";
import Footer from "./_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Key",
  description: "Full Real Estate website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
     <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Navbar/>
       <ConnectUserToConvext/>
        {children}
        <Footer/>
       
      </body>
    </html>
    </ClerkProvider>
    </ConvexClientProvider>
  );
}
