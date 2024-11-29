import type { Metadata } from "next";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Online shop built with Next.js & MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
