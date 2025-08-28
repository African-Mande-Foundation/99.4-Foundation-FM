import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import AppLoader from "./ui/AppLoader";
import Script from "next/script";

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "99.4 Foundation FM",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
       <head>
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
      </head>
      <body className={`${merriweather.className} antialiased`}>
        <Providers>
          <AppLoader>{children}</AppLoader>
        </Providers>
      </body>
    </html>
  );
}