import React, { useState, useEffect } from "react";
import { fetchCryptoPrices, updateCryptoPrices } from "../services/api";

const CryptoPrices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    loadPrices();

    // Auto-refresh prices every 60 seconds
    const interval = setInterval(() => {
      loadPrices();
    }, 60000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const loadPrices = async () => {
    const data = await fetchCryptoPrices();
    setPrices(data);
  };

  return (
    <div>
      <h2>Crypto Prices</h2>
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
