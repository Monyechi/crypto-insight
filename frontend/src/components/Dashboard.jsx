import React, { useState, useEffect } from "react";
import CryptoPrices from "./CryptoPrices";
import CryptoChart from "./CryptoChart";
import Portfolio from "./Portfolio";
import { getPortfolioValue } from "../services/api";

const Dashboard = ({ onLogout }) => {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    loadPortfolioValue();
  }, []);

  const loadPortfolioValue = async () => {
    const data = await getPortfolioValue();
    setTotalValue(data.total_value);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
      <h2 className="text-3xl font-semibold mb-4 text-blue-400">Dashboard</h2>
      <p className="text-xl mb-4">Total Portfolio Value: <span className="text-green-400">${totalValue.toFixed(2)}</span></p>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition mb-4"
        onClick={onLogout}
      >
        Logout
      </button>

      <div className="mt-6 space-y-6">
        <CryptoPrices />
        <CryptoChart symbol="bitcoin" />
        <CryptoChart symbol="ethereum" />
        <Portfolio />
      </div>
    </div>
  );
};

export default Dashboard;
