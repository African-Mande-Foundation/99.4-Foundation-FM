import type { Metadata } from "next";
import { Merriweather} from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'], // use what you need
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
    <html lang="en">
      <body
        className={`${merriweather.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
