import type { Metadata } from "next";
import "./globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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
