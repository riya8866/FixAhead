import { useState, useRef, useCallback, useEffect } from 'react';

interface UseCameraReturn {
  cameraActive: boolean;
  cameraError: string | null;
  cameraLoading: boolean;
  cameraRef: React.RefObject<HTMLVideoElement>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  takeSnapshot: () => Promise<Blob | null>;
}

export function useCamera(): UseCameraReturn {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Clean up function to stop the camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (cameraRef.current) {
      cameraRef.current.srcObject = null;
    }
    
    setCameraActive(false);
    setCameraError(null);
  }, []);
  
  // Clean up the camera when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);
  
  // Function to start the camera
  const startCamera = useCallback(async () => {
    setCameraLoading(true);
    setCameraError(null);
    
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera access is not supported in your browser');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setCameraError(err.message);
      } else if (typeof err === 'string') {
        setCameraError(err);
      } else {
        setCameraError('Failed to access camera');
      }
      console.error('Camera access error:', err);
    } finally {
      setCameraLoading(false);
    }
  }, []);
  
  // Function to take a snapshot from the camera
  const takeSnapshot = useCallback(async (): Promise<Blob | null> => {
    if (!cameraRef.current || !cameraActive) {
      setCameraError('Camera is not active');
      return null;
    }
    
    try {
      const video = cameraRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Draw the current video frame on the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert the canvas to an image blob
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            setCameraError('Failed to capture image');
            resolve(null);
            return;
          }
          resolve(blob);
        }, 'image/jpeg');
      });
    } catch (err) {
      if (err instanceof Error) {
        setCameraError(err.message);
      } else {
        setCameraError('Failed to capture image');
      }
      console.error('Snapshot error:', err);
      return null;
    }
  }, [cameraActive]);
  
  return {
    cameraActive,
    cameraError,
    cameraLoading,
    cameraRef,
    startCamera,
    stopCamera,
    takeSnapshot
  };
}
