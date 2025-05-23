import React, { useState } from "react";
import { motion } from "framer-motion";
import UploadAndPredict from "@/components/UploadAndPredict"; // Import the UploadAndPredict component
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // You can use your tab components
// import { useCamera } from "@/hooks/use-camera"; // Custom hook for camera access

type UploadType = "image" | "video" | "camera";

const TryDetector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UploadType>("image");
  // const { cameraActive, cameraRef, startCamera, stopCamera } = useCamera();

  return (
    <motion.section
      id="try-detector"
      className="space-y-12 pt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-center max-w-4xl mx-auto mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Test It Yourself: Upload, Scan, Detect
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Experience the power of our AI pothole detection technology firsthand.
          Upload an image or video, or use your camera to scan road conditions
          in real-time.
        </p>
      </motion.div>

      {/* How to Use Section */}
      <motion.div
        className="glass rounded-xl p-8 my-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 text-center">How to Use</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-14 w-14 rounded-full bg-secondary-dark flex items-center justify-center mx-auto">
              <span className="material-icons text-white">touch_app</span>
            </div>
            <h4 className="text-xl font-semibold">1. Select Input Method</h4>
            <p className="text-gray-300">
              Choose to upload an image, video, or use your device's camera.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="h-14 w-14 rounded-full bg-secondary-dark flex items-center justify-center mx-auto">
              <span className="material-icons text-white">file_upload</span>
            </div>
            <h4 className="text-xl font-semibold">2. Provide Media</h4>
            <p className="text-gray-300">
              Upload a file or allow camera access to capture road conditions.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-14 w-14 rounded-full bg-secondary-dark flex items-center justify-center mx-auto">
              <span className="material-icons text-white">auto_fix_high</span>
            </div>
            <h4 className="text-xl font-semibold">3. View Results</h4>
            <p className="text-gray-300">
              See detected potholes with bounding boxes and confidence scores.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Upload Options */}
      <motion.div
        className="my-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Tabs defaultValue="image" className="w-full">
          <TabsList className="flex flex-wrap justify-center mb-8 bg-transparent">
            <TabsTrigger
              value="image"
              className="px-6 py-3 rounded-tl-lg rounded-bl-lg data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:bg-primary-light data-[state=inactive]:text-gray-300"
              onClick={() => setActiveTab("image")}
            >
              Image Upload
            </TabsTrigger>
            {/* Commenting out Video and Camera Tabs */}
            {/*
            <TabsTrigger
              value="video"
              className="px-6 py-3 data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:bg-primary-light data-[state=inactive]:text-gray-300"
              onClick={() => setActiveTab("video")}
            >
              Video Upload
            </TabsTrigger>
            <TabsTrigger
              value="camera"
              className="px-6 py-3 rounded-tr-lg rounded-br-lg data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=inactive]:bg-primary-light data-[state=inactive]:text-gray-300"
              onClick={() => {
                setActiveTab("camera");
                if (!cameraActive) startCamera();
              }}
            >
              Camera Access
            </TabsTrigger>
            */}
          </TabsList>

          {/* Upload Container */}
          <div className="glass rounded-xl p-8">
            <TabsContent value="image" className="mt-0">
              <UploadAndPredict />
            </TabsContent>

            {/* Commenting out Video and Camera Content */}
            {/*
            <TabsContent value="video" className="mt-0">
              <UploadAndPredict />
            </TabsContent>

            <TabsContent value="camera" className="mt-0">
              <div className="text-center mb-8">
                <span className="material-icons text-5xl text-gray-400 mb-4">
                  photo_camera
                </span>
                <h4 className="text-xl font-semibold mb-2">
                  Use your camera to detect road damage in real-time
                </h4>
                <p className="text-gray-400">
                  Allow camera access when prompted
                </p>
              </div>

              {cameraActive ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-6 w-full max-w-3xl">
                    <video
                      ref={cameraRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <div className="absolute top-[30%] left-[20%] w-[20%] h-[15%] bounding-box rounded-sm"></div>
                    <div className="absolute top-[30%] left-[20%] bg-black bg-opacity-70 rounded px-2 py-1 text-xs">
                      Pothole: 92%
                    </div>
                  </div>
                  <button
                    onClick={stopCamera}
                    className="bg-destructive hover:bg-destructive/90 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center"
                  >
                    <span className="material-icons mr-2">stop</span>
                    Stop Camera
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={startCamera}
                    className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg transition duration-300 flex items-center"
                  >
                    <span className="material-icons mr-2">videocam</span>
                    Start Camera
                  </button>
                </div>
              )}

              <div className="mt-8 glass rounded-lg p-4 text-center">
                <p className="text-gray-300">
                  <span className="material-icons text-yellow-400 align-middle mr-1">
                    warning
                  </span>
                  For best results, ensure good lighting and hold your device
                  steady while scanning road surfaces.
                </p>
              </div>
            </TabsContent>
            */}
          </div>
        </Tabs>
      </motion.div>
    </motion.section>
  );
};

export default TryDetector;
