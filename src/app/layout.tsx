import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: "Money Monitor"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} selection:bg-yellow-300`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
