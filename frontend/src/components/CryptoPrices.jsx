import React, { useState, useEffect } from "react";
import { fetchCryptoPrices } from "../services/api";

const CryptoPrices = () => {
  const [prices, setPrices] = useState([]);
  const [countdown, setCountdown] = useState(60); // Start countdown from 60 seconds

  useEffect(() => {
    loadPrices();

    // Countdown Timer: Decreases every second
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);

    // Auto-fetch prices every 60 seconds
    const priceUpdateInterval = setInterval(() => {
      loadPrices();
      setCountdown(60); // Reset countdown after fetching prices
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
    <div>
      <h2>Crypto Prices</h2>
      <p>Next price update in: <strong>{countdown} seconds</strong></p>
      <table border="1">
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
