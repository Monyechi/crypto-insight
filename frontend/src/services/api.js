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

export const fetchHistoricalPrices = async (symbol) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/historical/${symbol}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching historical prices:", error);
    return [];
  }
};

export const addHolding = async (user_id, symbol, amount) => {
  try {
    await axios.post("http://127.0.0.1:8000/api/portfolio/add/", {
      user_id,
      symbol,
      amount,
    });
  } catch (error) {
    console.error("Error adding holding:", error);
  }
};

export const getPortfolio = async (user_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/portfolio/${user_id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return [];
  }
};

export const getPortfolioValue = async (user_id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/portfolio/value/${user_id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio value:", error);
    return { total_value: 0, portfolio: [] };
  }
};
