import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Provider from "@/components/Providers";
import Sidebar from "@/components/Sidebar/Sidebar";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

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
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider
            theme={theme}
            defaultMode="dark"
          >
            <CssBaseline enableColorScheme />
            <Provider>
              <Sidebar />
              <div className="page">
                <Header />
                {children}
                <Footer />
              </div>
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
