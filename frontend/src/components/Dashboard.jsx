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
    <div className="bg-card p-8 rounded-xl shadow-strong w-full max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 text-primary">Dashboard</h2>
      <p className="text-2xl mb-6">
        Total Portfolio Value:{" "}
        <span className="text-success font-bold">${totalValue.toFixed(2)}</span>
      </p>
      <button
        className="bg-danger hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition duration-200 ease-in-out shadow-md mb-6"
        onClick={onLogout}
      >
        Logout
      </button>
      <div className="mt-6 space-y-8">
        <CryptoPrices />
        <CryptoChart symbol="bitcoin" />
        <CryptoChart symbol="ethereum" />
        <Portfolio />
      </div>
    </div>
  );
};

export default Dashboard;
