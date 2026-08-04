import type { Metadata } from "next";
import Script from "next/script";
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
  description:
    "If you are thinking about hiring a dedicated dev who always tries to keep you motivated, you are in the right place!",
  verification: {
    google: "wx-aekZZqB7RbsfT0ha2M7bPO3dq-EMK-0IYbxaqf_0",
  },
  openGraph: {
    title: "Adib Ahsan Chowdhury - Developer Portfolio",
    description:
      "If you are thinking about hiring a dedicated dev who always tries to keep you motivated, you are in the right place!",
    images: [
      {
        url: "https://adibahsan.github.io/seo_ss.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    ],
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
      </head>
      <body className={redHatDisplay.variable}>
        <h1
          style={{
            position: "absolute",
            left: "-9999px",
          }}
        >
          Adib Ahsan Chowdhury - Developer Portfolio
        </h1>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z0C2KX9Y8G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z0C2KX9Y8G');
          `}
        </Script>
      </body>
    </html>
  );
}
