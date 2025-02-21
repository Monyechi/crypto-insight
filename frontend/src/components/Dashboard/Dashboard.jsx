// Dashboard.jsx
import React, { useState, useEffect } from "react";
import CryptoPrices from "../CryptoPrices/CryptoPrices";
import { getPortfolioValue } from "../../services/api";

const Dashboard = ({ onLogout }) => {
  // Optional: if you want to show total portfolio value here, remove if not needed.
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    loadPortfolioValue();
  }, []);

  const loadPortfolioValue = async () => {
    const data = await getPortfolioValue();
    setTotalValue(data.total_value);
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-strong w-full max-w-3xl text-center">
      <h2 className="text-4xl font-bold mb-6 text-primary">Dashboard</h2>

      {/* Only Crypto Prices now */}
      <CryptoPrices />
    </div>
  );
};

export default Dashboard;
