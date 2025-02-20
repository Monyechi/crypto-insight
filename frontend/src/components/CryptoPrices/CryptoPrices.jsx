import React, { useState, useEffect } from "react";
import { fetchCryptoPrices } from "../../services/api";
import "./CryptoPrices.css"; // <-- Import your new CSS file

const CryptoPrices = () => {
  const [prices, setPrices] = useState([]);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    loadPrices();

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);

    const priceUpdateInterval = setInterval(() => {
      loadPrices();
      setCountdown(60);
    }, 60000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(priceUpdateInterval);
    };
  }, []);

  const loadPrices = async () => {
    const data = await fetchCryptoPrices();
    setPrices(data);
  };

  return (
    <div className="crypto-prices-container">
      <h2 className="crypto-prices-title">Crypto Prices</h2>
      <div className="countdown-info">
        Next price update in: <strong>{countdown} seconds</strong>
      </div>

      <table className="crypto-prices-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((crypto, index) => (
            <tr key={index}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>${crypto.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrices;
