import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const translatingText = async textForTranslate => {
  try {
    const response = await axios.post(`${API_URL}/translate`, {
      text: textForTranslate
    });
    return response.data;
  } catch (error) {
    console.error("Add product error:", error);
    throw new Error("Failed to add product");
  }
};
