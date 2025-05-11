import onnxruntime as ort
import numpy as np
from PIL import Image
import io
from fastapi import FastAPI, UploadFile
import cv2
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or use ["http://localhost:5000"] for stricter setup
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the YOLOv11 ONNX model
session = ort.InferenceSession("best.onnx")

# Print input details of the ONNX model
print("Model Inputs:", session.get_inputs())
print("Model Outputs:", session.get_outputs())

@app.post("/predict/")
async def predict(file: UploadFile):
    # Read and load the original image
    image_bytes = await file.read()
    original_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    original_width, original_height = original_image.size

    # Resize to 640x640 for model input
    image = original_image.resize((640, 640))
    input_data = np.array(image).astype("float32") / 255.0
    input_data = np.transpose(input_data, (2, 0, 1))
    input_data = np.expand_dims(input_data, axis=0)

    # Run inference
    outputs = session.run(None, {"images": input_data})
    predictions = outputs[0]

    boxes = predictions[0][:, :4]
    confidences = predictions[0][:, 4]
    class_ids = predictions[0][:, 5]

    result = []
    threshold = 0.5

    for i in range(len(confidences)):
        if confidences[i] > threshold:
            box = boxes[i]
            class_id = int(class_ids[i])
            confidence = float(confidences[i])

            # Scale box coordinates back to original image size
            x1 = int(box[0] * original_width / 640)
            y1 = int(box[1] * original_height / 640)
            x2 = int(box[2] * original_width / 640)
            y2 = int(box[3] * original_height / 640)

            result.append({
                "box": [x1, y1, x2, y2],
                "class_id": class_id,
                "label": "pothole",  # Assuming only one class
                "confidence": confidence
            })

    return {"predictions": result}
