import { useState, useCallback } from 'react';

interface UseFileUploadReturn {
  file: File | null;
  preview: string | null;
  isLoading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<void>;
  resetUpload: () => void;
}

export function useFileUpload(options?: {
  maxSizeMB?: number;
  acceptedTypes?: string[];
}): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const maxSize = (options?.maxSizeMB || 10) * 1024 * 1024; // Default 10MB
  
  const uploadFile = useCallback(async (file: File) => {
    // Reset states
    setError(null);
    setIsLoading(true);
    
    try {
      // Validate file size
      if (file.size > maxSize) {
        throw new Error(`File size exceeds the ${options?.maxSizeMB || 10}MB limit`);
      }
      
      // Validate file type if acceptedTypes is provided
      if (options?.acceptedTypes && options.acceptedTypes.length > 0) {
        const fileType = file.type.split('/')[1];
        if (!options.acceptedTypes.includes(fileType)) {
          throw new Error(`File type ${fileType} is not supported`);
        }
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      setFile(file);
      setPreview(previewUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during file upload');
      }
    } finally {
      setIsLoading(false);
    }
  }, [maxSize, options?.acceptedTypes]);
  
  const resetUpload = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setError(null);
  }, [preview]);
  
  return {
    file,
    preview,
    isLoading,
    error,
    uploadFile,
    resetUpload
  };
}
