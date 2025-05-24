import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const adminLogin = async loginQuery => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginQuery);
    return response.data;
  } catch (error) {
    console.error("Admin login error:", error);
    throw new Error("Login failed");
  }
};

export const getProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Get product error:", error);
    throw new Error("Failed to fetch product");
  }
};

export const addProduct = async newProductData => {
  try {
    const response = await axios.post(`${API_URL}/product`, newProductData);
    return response.data;
  } catch (error) {
    console.error("Add product error:", error);
    throw new Error("Failed to add product");
  }
};

export const updateProduct = async (updatedProductId, updatedProductData) => {
  try {
    const response = await axios.put(
      `${API_URL}/product/${updatedProductId}`,
      updatedProductData
    );
    return response.data;
  } catch (error) {
    console.error("Update product error:", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async deletedProductId => {
  try {
    const response = await axios.delete(
      `${API_URL}/product/${deletedProductId}`
    );
    return response.data;
  } catch (error) {
    console.error("Delete product error:", error);
    throw new Error("Failed to delete product");
  }
};
