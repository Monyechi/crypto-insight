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
    const response = await axios.get(
      `http://127.0.0.1:8000/api/historical/${symbol}/`
    );
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

export const registerUser = async (username, password) => {
  try {
    await axios.post(`${API_BASE_URL}auth/register/`, { username, password });
    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    console.error("Error registering user:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.error || "Registration failed.",
    };
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login/`, {
      username,
      password,
    });
    localStorage.setItem("accessToken", response.data.access);
    return { success: true, token: response.data.access };
  } catch (error) {
    console.error("Error logging in:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.error || "Login failed.",
    };
  }
};

export const getPortfolio = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`${API_BASE_URL}portfolio/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPortfolioValue = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get("http://127.0.0.1:8000/api/portfolio/value/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio value:", error);
    return { total_value: 0, portfolio: [] };
  }
};

