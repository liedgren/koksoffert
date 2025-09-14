"use client";

import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import styles from "./Hero.module.css";

interface HeroProps {
  title: string;
  subtitle: string;
  uploadPlaceholder?: string;
  uploadButtonText?: string;
  onFileUpload?: (file: File) => void;
}

export default function Hero({
  title,
  subtitle,
  uploadPlaceholder = "Ladda upp din befintliga offert.",
  uploadButtonText = "Jämför din offert",
  onFileUpload,
}: HeroProps) {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setIsFormExpanded(true);
  };

  const handleUploadClick = () => {
    setIsFormExpanded(true);
  };

  // Listen for header CTA clicks and check URL parameters
  useEffect(() => {
    const handleHeaderCtaClick = () => {
      setIsFormExpanded(true);
    };

    // Check if URL has expandForm parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("expandForm") === "true") {
      setIsFormExpanded(true);
      // Clean up URL by removing the parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("expandForm");
      window.history.replaceState({}, "", newUrl.toString());
    }

    window.addEventListener("headerCtaClick", handleHeaderCtaClick);

    return () => {
      window.removeEventListener("headerCtaClick", handleHeaderCtaClick);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadedFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let blobUrl = "";

      // First upload the file if one exists
      if (uploadedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", uploadedFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          blobUrl = uploadResult.blobUrl;
        } else {
          const uploadError = await uploadResponse.json();
          console.error("Upload failed:", uploadError);
          throw new Error("File upload failed");
        }
      }

      // Then submit the form data with the blob URL
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone);
      submitData.append("email", formData.email);

      if (blobUrl) {
        submitData.append("blobUrl", blobUrl);
      }

      const response = await fetch("/api/submit", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form data
        setFormData({
          name: "",
          phone: "",
          email: "",
        });
        setUploadedFile(null);
      } else {
        const errorData = await response.json();
        console.error("Submit failed:", errorData);
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ett fel uppstod. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`${styles.heroSection} ${
        isFormExpanded ? styles.expanded : ""
      }`}
    >
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.formContainer}>
          {!isFormExpanded && (
            <FileUpload
              placeholder={uploadPlaceholder}
              buttonText={uploadButtonText}
              accept=".pdf"
              onUpload={handleUploadClick}
              onFileSelect={handleFileSelect}
            />
          )}

          {isFormExpanded && (
            <div className={`${styles.expandingForm} ${styles.expanded}`}>
              {isSuccess ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>
                    Tack för din förfrågan!
                  </h3>
                  <p className={styles.successText}>
                    Vi har mottagit din förfrågan och kommer att kontakta dig
                    inom 24 timmar med en personlig offert.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="file-upload-form" className={styles.label}>
                      Ladda upp offert (valfritt)
                    </label>
                    <div className={styles.fileUploadContainer}>
                      <input
                        type="file"
                        id="file-upload-form"
                        name="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                      />
                      <label
                        htmlFor="file-upload-form"
                        className={styles.fileUploadLabel}
                      >
                        <div className={styles.fileUploadIcon}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7,10 12,15 17,10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </div>
                        <span className={styles.fileUploadText}>
                          {uploadedFile
                            ? uploadedFile.name
                            : "Välj fil eller dra och släpp här"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Namn *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="Ditt fullständiga namn"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Telefonnummer *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="Ditt telefonnummer"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      E-postadress *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                      placeholder="Din e-postadress"
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Skickar..." : "Skicka förfrågan"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
