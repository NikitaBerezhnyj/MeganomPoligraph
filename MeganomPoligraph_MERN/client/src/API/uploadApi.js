import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const saveUploadFile = async selectedFile => {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("Upload file saved successfully");
    return response.data;
  } catch (error) {
    console.error("Error saving upload file:", error);
  }
};
