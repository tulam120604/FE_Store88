import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./util/Provider";
export const metadata: Metadata = {
  title: "Trang chủ - Store88",
  description: "Generated by create next app",
};

const poppins = Inter({
  subsets: ['vietnamese'],
  weight: ['500']
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
