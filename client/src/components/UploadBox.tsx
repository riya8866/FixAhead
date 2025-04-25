import { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { processMedia } from "@/lib/ai-detector";
import DetectionResult from "./DetectionResult";

interface UploadBoxProps {
  type: "image" | "video";
  onResultsReady?: (results: any) => void;
}

export default function UploadBox({ type, onResultsReady }: UploadBoxProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isImage = type === "image";
  const acceptedTypes = isImage 
    ? { 'image/*': ['.jpeg', '.jpg', '.png', '.bmp'] }
    : { 'video/*': ['.mp4', '.mov', '.avi'] };
  const maxSize = isImage ? 10 * 1024 * 1024 : 50 * 1024 * 1024; // 10MB for images, 50MB for videos

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedTypes,
    maxSize,
    multiple: false,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          setError(`File is too large. Max size is ${isImage ? "10MB" : "50MB"}.`);
        } else {
          setError(`Invalid file. Please upload a ${isImage ? "JPG, PNG, or BMP" : "MP4, MOV, or AVI"}.`);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFile(file);
        setError(null);
        
        // Create preview URL
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
        
        // Process the file
        setIsProcessing(true);
        try {
          const detectionResults = await processMedia(file, type);
          setResults(detectionResults);
          if (onResultsReady) {
            onResultsReady(detectionResults);
          }
        } catch (err) {
          console.error("Error processing file:", err);
          setError("An error occurred while processing the file. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      }
    }
  });

  const resetUpload = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setResults(null);
    setError(null);
  };

  // If we have results, show them
  if (results) {
    return (
      <div>
        <DetectionResult 
          type={type}
          previewUrl={previewUrl!}
          results={results}
        />
        <div className="flex justify-center mt-8">
          <button 
            onClick={resetUpload}
            className="bg-primary-light hover:bg-primary text-white px-6 py-3 rounded-lg transition duration-300 mr-4 flex items-center"
          >
            <span className="material-icons mr-2">restart_alt</span>
            Try Another {isImage ? "Image" : "Video"}
          </button>
          <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
            <span className="material-icons mr-2">share</span>
            Share Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        {...getRootProps()}
        className={cn(
          "upload-box rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer",
          isDragActive && "border-secondary",
          error && "border-red-500"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Processing {isImage ? "image" : "video"}...</p>
          </div>
        ) : (
          <>
            <span className="material-icons text-4xl text-gray-400 mb-4">
              {isImage ? "image" : "videocam"}
            </span>
            <h4 className="text-xl font-semibold mb-2">
              {isDragActive 
                ? `Drop your ${type} here` 
                : `Drop your ${type} here`}
            </h4>
            <p className="text-gray-400 mb-6">or click to browse</p>
            <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
              <span className="material-icons mr-2">upload_file</span>
              Choose {isImage ? "Image" : "Video"}
            </button>
            <input {...getInputProps()} />
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: {isImage ? "JPG, PNG, BMP" : "MP4, MOV, AVI"} (Max: {isImage ? "10MB" : "50MB"})
            </p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </>
        )}
      </motion.div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-300">
          <span className="material-icons text-accent align-middle mr-1">info</span>
          {isImage 
            ? "Image analysis identifies road damage with bounding boxes and confidence scores."
            : "Video analysis processes each frame to detect road damage. Results will show timestamps of detected issues."}
        </p>
      </div>
    </div>
  );
}
