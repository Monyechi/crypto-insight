// src/components/Portfolio/Portfolio.jsx
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Portfolio = () => {
  const [symbol, setSymbol] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [holdings, setHoldings] = useState([]);

  // Example 1hr chart data. In real usage, you'd fetch or compute over time
  const [chartData, setChartData] = useState({
    labels: [
      "00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00",
    ],
    datasets: [
      {
        label: "Portfolio Value (USD)",
        data: [1000, 1020, 1030, 1010, 1025, 1040, 1050],
        borderColor: "#3b82f6",
        fill: false,
        tension: 0.1,
      },
    ],
  });

  const handleAddHolding = () => {
    if (!amount || !price) return;
    const newHolding = {
      symbol,
      amount: parseFloat(amount),
      price: parseFloat(price),
      id: Date.now(), // unique ID
    };
    setHoldings((prev) => [...prev, newHolding]);

    // Clear inputs
    setAmount("");
    setPrice("");
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-strong w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">My Portfolio</h2>

      {/* Form for adding a holding */}
      <div className="mb-4">
        <label className="block mb-1 text-left font-semibold text-text">
          Symbol
        </label>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-left font-semibold text-text">
          Amount
        </label>
        <input
          type="number"
          min="0"
          step="any"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount of BTC/ETH"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-left font-semibold text-text">
          Price (USD)
        </label>
        <input
          type="number"
          min="0"
          step="any"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price you paid"
        />
      </div>

      <button
        className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddHolding}
      >
        Add Holding
      </button>

      {/* Scrollable list of holdings */}
      <div
        className="mt-6 overflow-y-auto"
        style={{ maxHeight: "200px", border: "1px solid #4b5563", borderRadius: "0.5rem" }}
      >
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2">Symbol</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Price Paid</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr key={h.id} className="border-b border-gray-600">
                <td className="p-2">{h.symbol}</td>
                <td className="p-2">{h.amount}</td>
                <td className="p-2">${h.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 1hr line chart for entire portfolio */}
      <div className="mt-6 bg-gray-800 p-4 rounded">
        <h3 className="text-xl font-semibold text-white mb-2">1hr Portfolio Chart</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Portfolio;
