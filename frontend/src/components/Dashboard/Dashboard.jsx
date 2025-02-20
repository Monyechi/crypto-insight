import React, { useState, useEffect } from "react";
import CryptoPrices from "../CryptoPrices/CryptoPrices";
import CryptoChart from "../CryptoChart/CryptoChart";
import Portfolio from "../Portfolio/Portfolio";
import { getPortfolioValue } from "../../services/api";


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
    <div className="bg-card p-6 rounded-xl shadow-strong w-full max-w-3xl text-center">
      <h2 className="text-4xl font-bold mb-6 text-primary">Dashboard</h2>
      <p className="text-2xl mb-6">
        Total Portfolio Value:{" "}
        <span className="text-success">${totalValue.toFixed(2)}</span>
      </p>
      <button
        className="bg-danger hover:bg-danger/90 text-white font-bold py-3 px-6 rounded transition mb-6"
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
