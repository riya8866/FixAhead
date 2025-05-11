const API_URL = "http://localhost:8000/predict/";

export async function sendMediaToBackend(file: File, type: string = "image") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Fetch failed with status:", response.status);
      if (response.status === 403 || response.status === 401 || response.status === 0) {
        throw new Error("CORS or auth error!");
      }
      throw new Error("Failed to process media.");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while calling backend:", error.message);
    throw error;
  }
}
