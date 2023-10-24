import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DDShop_fakestore",
  description: "shop maked with the fakestore api",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-red-50 text-red-950">{children}</body>
    </html>
  );
}
