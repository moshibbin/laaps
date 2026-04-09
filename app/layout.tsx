import "./globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAAPS Institute - Applied Analysis for Practical Solutions",
  description:
    "LAAPS Institute is a multidisciplinary research and advisory institute in the Horn of Africa, generating high-quality evidence to inform policy and support effective solutions for development, humanitarian, and governance interventions.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={`${inter.variable} ${merriweather.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
