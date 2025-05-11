import { useState, useRef } from "react";
import { sendMediaToBackend } from "@/utils/api";

const UploadAndPredict = () => {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const type = file.type.startsWith("image") ? "image" : "video";
    setMediaType(type);

    const url = URL.createObjectURL(file);
    setMediaUrl(url);

    const result = await sendMediaToBackend(file, type);
    setPredictions(result.predictions || []);

    if (type === "image") {
      setTimeout(() => drawBoundingBoxes(result.predictions), 100); // slight delay to wait for image load
    }
  };

  const drawBoundingBoxes = (data: any[]) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match the image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Clear the canvas and redraw the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";

    // Iterate over predictions and draw boxes
    data.forEach((prediction) => {
      if (
        prediction.box &&
        Array.isArray(prediction.box) &&
        prediction.box.length === 4
      ) {
        let [x1, y1, x2, y2] = prediction.box;

        // No scaling needed — box already matches original dimensions

        const confidence =
          prediction.confidence > 1
            ? prediction.confidence / 100
            : prediction.confidence;

        const label = "Pothole";
        ctx.beginPath();
        ctx.rect(x1, y1, x2 - x1, y2 - y1);
        ctx.stroke();
        ctx.fillText(
          `${label} ${confidence.toFixed(1)}`,
          x1,
          y1 > 20 ? y1 - 5 : y1 + 15
        );
      } else {
        console.warn("Invalid box format", prediction);
      }
    });
  };

  return (
    <div>
      <h2>Upload and Predict</h2>
      <input type="file" onChange={handleUpload} />
      {mediaUrl && mediaType === "image" && (
        <div>
          <img
            ref={imageRef}
            src={mediaUrl}
            alt="Uploaded Media"
            style={{ display: "none" }}
            onLoad={() => drawBoundingBoxes(predictions)} // Trigger draw on image load
          />
          <canvas ref={canvasRef}></canvas>
        </div>
      )}
    </div>
  );
};

export default UploadAndPredict;
