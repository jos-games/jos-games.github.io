import type {Metadata} from "next";
import "./globals.css";
import {Roboto_Mono} from 'next/font/google';

export const metadata: Metadata = {
  title: "Jo's Games",
  description: "Jo's Games",
icons: {
    icon: [
        { url: "/full-logo.png", sizes: "32x32", type: "image/png" },
    ],
},
};

const robotoMono = Roboto_Mono({
  subsets: ['monospace'],
  weight: ['300', '500', '700'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased roboto-mono-medium`}>
        {children}
      </body>
    </html>
  );
}
