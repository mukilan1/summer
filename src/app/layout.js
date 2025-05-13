"use client"; // Add this directive at the top

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Can't use metadata with "use client" directive
// Will need to use next/head for setting metadata in client components

export default function RootLayout({ children }) {
  // Now you can use useEffect here if needed
  
  return (
    <html lang="en" className="light-theme" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
