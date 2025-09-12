import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Koksoffert - Professional Kitchen Offers",
  description: "Get professional kitchen offers and quotes for your business.",
  keywords: "kitchen, offers, quotes, professional, catering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
