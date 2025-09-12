export interface UploadFormData {
  name: string;
  email: string;
  message: string;
  file: File | null;
}

export interface UploadFormProps {
  onSubmit?: (data: UploadFormData) => void;
  className?: string;
}
