import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gann Square Calculator",
  description: "Financial analysis tool for price pivots",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
