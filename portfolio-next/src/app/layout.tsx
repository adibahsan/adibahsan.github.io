import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const redHatDisplay = Red_Hat_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-red-hat-display",
});

export const metadata: Metadata = {
  title: "Adib Ahsan Chowdhury - Developer Portfolio",
  description: "If you are thinking about hiring a dedicated dev who always tries to keep you motivated, you are in the right place!",
  openGraph: {
    title: "Adib Ahsan Chowdhury - Developer Portfolio",
    description: "If you are thinking about hiring a dedicated dev who always tries to keep you motivated, you are in the right place!",
    images: ["https://adibahsan.github.io/seo_ss.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      </head>
      <body className={redHatDisplay.variable}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
