import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

export const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}get-prices/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return [];
  }
};

export const updateCryptoPrices = async () => {
  try {
    await axios.get(`${API_BASE_URL}fetch-prices/`);
  } catch (error) {
    console.error("Error updating crypto prices:", error);
  }
};
