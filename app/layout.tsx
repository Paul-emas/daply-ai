import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Daply ai",
  description: "Daply assessment test",
};

const geist = Raleway({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <Toaster richColors closeButton />
      <body>{children}</body>
    </html>
  );
}
