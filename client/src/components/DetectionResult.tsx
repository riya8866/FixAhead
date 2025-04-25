import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface DetectionResultProps {
  type: "image" | "video";
  previewUrl: string;
  results: {
    detections: Array<{
      id: number;
      type: string;
      confidence: number;
      box: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      severity: "Low" | "Medium" | "High";
    }>;
    summary: {
      totalIssues: number;
      recommendedAction: string;
    };
  };
}

export default function DetectionResult({ type, previewUrl, results }: DetectionResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "High": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">Detection Results</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          className="relative"
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {type === "image" ? (
            <img 
              src={previewUrl} 
              alt="Road with detected potholes" 
              className="w-full rounded-lg object-cover"
            />
          ) : (
            <video 
              src={previewUrl} 
              controls
              className="w-full rounded-lg object-cover"
            />
          )}
          
          {/* Detection boxes */}
          {results.detections.map((detection) => (
            <motion.div
              key={detection.id}
              className="bounding-box rounded-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: detection.id * 0.1 }}
              style={{
                top: `${detection.box.y}%`,
                left: `${detection.box.x}%`,
                width: `${detection.box.width}%`,
                height: `${detection.box.height}%`,
              }}
            />
          ))}
          
          {/* Confidence labels */}
          {results.detections.map((detection) => (
            <motion.div
              key={`label-${detection.id}`}
              className="absolute bg-black bg-opacity-70 rounded px-2 py-1 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: detection.id * 0.1 + 0.2 }}
              style={{
                top: `${detection.box.y + 2}%`,
                left: `${detection.box.x + 2}%`,
              }}
            >
              {detection.type}: {Math.round(detection.confidence * 100)}%
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="glass rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-primary-light p-3 border-b border-primary-dark">
            <h5 className="font-medium">Detection Summary</h5>
          </div>
          <div className="p-4 space-y-4">
            {results.detections.map((detection) => (
              <motion.div 
                key={`detail-${detection.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: detection.id * 0.15 }}
              >
                <h6 className="font-medium mb-1">{detection.type} #{detection.id}</h6>
                <div className="flex items-center mb-1">
                  <span className="text-gray-300 text-sm w-24">Confidence:</span>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="confident-score h-full rounded-full" 
                      style={{ width: `${detection.confidence * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm">{Math.round(detection.confidence * 100)}%</span>
                </div>
                <div className="flex items-start mb-1">
                  <span className="text-gray-300 text-sm w-24">Location:</span>
                  <span className="text-sm">
                    {detection.box.x > 50 ? "Right" : "Left"} 
                    {detection.box.y > 50 ? " bottom" : " top"} of {type}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-300 text-sm w-24">Severity:</span>
                  <span className={`text-sm ${getSeverityColor(detection.severity)}`}>
                    {detection.severity} - 
                    {detection.severity === "High" 
                      ? " immediate attention recommended" 
                      : detection.severity === "Medium"
                        ? " monitor for deterioration"
                        : " regular monitoring advised"}
                  </span>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              className="pt-4 border-t border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total issues detected:</span>
                <span className="font-medium">{results.summary.totalIssues}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Recommended action:</span>
                <span className="font-medium text-red-400">{results.summary.recommendedAction}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
