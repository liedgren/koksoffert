import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - Koksoffert",
  description: "Your kitchen offer request has been submitted successfully.",
};

export default function SuccessPage() {
  return (
    <main>
      <div className="container">
        <h1>Thank You!</h1>
        <p>Your request has been submitted successfully.</p>
        <p>
          We'll review your requirements and get back to you with a professional
          kitchen offer within 24 hours.
        </p>
        <a href="/" className="cta-button">
          Back to Home
        </a>
      </div>
    </main>
  );
}
