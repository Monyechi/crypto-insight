import React, { useState, useEffect } from "react";
import { fetchCryptoPrices } from "../../services/api";

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
    <div className="bg-card p-6 rounded-xl shadow-soft">
      <h2 className="text-2xl font-bold text-text mb-4">Crypto Prices</h2>
      <p className="text-secondary mb-4">
        Next price update in: <strong>{countdown} seconds</strong>
      </p>
      <table className="w-full table-auto mt-4 text-text">
        <thead>
          <tr>
            <th className="border-b border-gray-600 py-2">Name</th>
            <th className="border-b border-gray-600 py-2">Symbol</th>
            <th className="border-b border-gray-600 py-2">Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((crypto, index) => (
            <tr key={index}>
              <td className="py-2 border-b border-gray-600">{crypto.name}</td>
              <td className="py-2 border-b border-gray-600">{crypto.symbol}</td>
              <td className="py-2 border-b border-gray-600">${crypto.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPrices;
