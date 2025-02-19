import React, { useState } from "react";
import CryptoPrices from "./components/CryptoPrices";
import CryptoChart from "./components/CryptoChart";
import Portfolio from "./components/Portfolio";
import Login from "./components/Login";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

export const registerUser = async (username, password) => {
  try {
    await axios.post(`${API_BASE_URL}auth/register/`, { username, password });
    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    console.error("Error registering user:", error.response?.data);
    return { success: false, message: error.response?.data?.error || "Registration failed." };
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login/`, { username, password });
    localStorage.setItem("accessToken", response.data.access);
    return { success: true, token: response.data.access };
  } catch (error) {
    console.error("Error logging in:", error.response?.data);
    return { success: false, message: error.response?.data?.error || "Login failed." };
  }
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <div className="App">
      <h1>Crypto Market Analyzer</h1>
      
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <CryptoPrices />
          <CryptoChart symbol="bitcoin" />
          <CryptoChart symbol="ethereum" />
          <Portfolio />
        </>
      )}
    </div>
  );
}



export default App;
