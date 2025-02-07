import type { Metadata } from "next";
import { Noto_Sans_Thai } from 'next/font/google'
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { Providers } from "./providers";

const Noto_Sans_ThaiSans = Noto_Sans_Thai({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Noto_Sans_ThaiSans.variable} antialiased`}
      >
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
