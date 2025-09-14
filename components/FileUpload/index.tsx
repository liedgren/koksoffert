"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  placeholder?: string;
  buttonText?: string;
  accept?: string;
  onUpload?: (file: File) => void;
  onFileSelect?: (file: File) => void;
}

export default function FileUpload({
  placeholder = "Ladda upp din befintliga offert.",
  buttonText = "Jämför din offert",
  accept = ".pdf",
  onUpload,
  onFileSelect,
}: FileUploadProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);

    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      if (onUpload) {
        onUpload(selectedFile);
      }
      // Note: File upload now handled by parent component (Hero) via onFileSelect
    }
  };

  return (
    <form className={styles.uploadForm} onSubmit={handleUpload}>
      <div className={styles.fileUploadArea}>
        <input
          type="file"
          name="file"
          id="file-upload"
          accept={accept}
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <label htmlFor="file-upload" className={styles.fileLabel}>
          <div className={styles.uploadIcon}>
            <svg
              width="24"
              height="24"
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
          <span className={styles.uploadText}>
            {selectedFile ? selectedFile.name : placeholder}
          </span>
        </label>
      </div>
    </form>
  );
}
