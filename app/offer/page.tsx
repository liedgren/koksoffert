import UploadForm from "@/components/UploadForm";

export default function OfferPage() {
  return (
    <main>
      <div className="container">
        <h1>Get Your Kitchen Offer</h1>
        <p>
          Upload your requirements and we'll get back to you with a professional
          quote.
        </p>
        <UploadForm />
      </div>
    </main>
  );
}
