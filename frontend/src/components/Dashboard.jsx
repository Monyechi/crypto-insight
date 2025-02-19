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
    <div>
      <h2>Dashboard</h2>
      <p>Total Portfolio Value: <strong>${totalValue.toFixed(2)}</strong></p>
      <button onClick={onLogout}>Logout</button>

      <CryptoPrices />
      <CryptoChart symbol="bitcoin" />
      <CryptoChart symbol="ethereum" />
      <Portfolio />
    </div>
  );
};

export default Dashboard;
