import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Koksoffert - Professional Kitchen Offers",
  description: "Get professional kitchen offers and quotes for your business.",
};

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <h1>Koksoffert</h1>
        <p>Professional kitchen offers and quotes for your business.</p>
        <div className="cta-buttons">
          <Link href="/offer" className="cta-button">
            Get Your Offer
          </Link>
          <Link href="/artiklar" className="cta-button secondary">
            Read Artiklar
          </Link>
        </div>
      </div>
    </main>
  );
}
