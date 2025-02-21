// src/components/Portfolio/Portfolio.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
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

function Portfolio() {
  // Form inputs
  const [symbol, setSymbol] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [pricePaid, setPricePaid] = useState("");

  // Portfolio data
  const [holdings, setHoldings] = useState([]); // array of { symbol, amount, price_paid, etc. }

  // Calculated totals
  const [totalValue, setTotalValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  // Chart data
  const [chartData, setChartData] = useState(null);

  // 1. Fetch existing holdings from backend on mount
  useEffect(() => {
    fetchHoldings();
  }, []);

  // 2. Whenever holdings change, recalc totals and reload chart
  useEffect(() => {
    calculatePortfolio();
    loadChartData();
  }, [holdings]);

  // -------------------------------
  //      API CALLS
  // -------------------------------

  const fetchHoldings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      // IMPORTANT: Use the Django server URL on port 8000
      const res = await axios.get("http://localhost:8000/crypto/portfolio/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("GET /portfolio/ response:", res.data);

      // If your backend returns an array, do this:
      setHoldings(res.data);

      // If your backend returns {"portfolio": [...]} instead, do:
      // setHoldings(res.data.portfolio);

    } catch (err) {
      console.error("Error fetching holdings:", err);
    }
  };

  const addHoldingToBackend = async (symbol, amount, pricePaid) => {
    try {
      const token = localStorage.getItem("accessToken");
      // Again, point to port 8000 for the POST request
      await axios.post(
        "http://localhost:8000/portfolio/add/",
        { symbol, amount, pricePaid },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Error adding holding:", err);
    }
  };

  // -------------------------------
  //      HANDLERS & CALCULATIONS
  // -------------------------------

  const handleAddHolding = async (e) => {
    e.preventDefault();
    if (!amount || !pricePaid) return;

    // 1) Send to backend
    await addHoldingToBackend(symbol, amount, pricePaid);

    // 2) Refresh holdings from DB
    fetchHoldings();

    // 3) Reset form
    setSymbol("bitcoin");
    setAmount("");
    setPricePaid("");
  };

  // Calculate total portfolio value & profit/loss
  const calculatePortfolio = () => {
    let totalPaid = 0;
    let currentValue = 0;

    // Placeholder prices for demonstration:
    holdings.forEach((h) => {
      const currentPrice = h.symbol === "bitcoin" ? 26000 : 1700;
      // If your backend stores it as "price_paid" (snake_case), use h.price_paid
      const paid = h.price_paid ?? h.pricePaid ?? 0;
      totalPaid += paid * h.amount;
      currentValue += currentPrice * h.amount;
    });

    setTotalValue(currentValue);
    setProfitLoss(currentValue - totalPaid);
  };

  // Build chart data (mock example)
  const loadChartData = () => {
    // In a real app, you'd fetch historical data for the combined portfolio
    const timestamps = ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50"];
    const values = [1000, 1050, 1025, 1080, 1100, totalValue];

    setChartData({
      labels: timestamps,
      datasets: [
        {
          label: "Portfolio Value (USD)",
          data: values,
          borderColor: "#3b82f6",
          fill: false,
          tension: 0.1,
        },
      ],
    });
  };

  // Determine arrow color + symbol
  const isProfit = profitLoss >= 0;
  const arrowSymbol = isProfit ? "↑" : "↓";
  const arrowColor = isProfit ? "green" : "red";

  // -------------------------------
  //      RENDER
  // -------------------------------

  return (
    <div className="bg-card p-6 rounded-xl shadow-strong w-full max-w-3xl text-center mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-primary">Portfolio</h2>

      {/* Total Portfolio Value + arrow */}
      <p className="text-2xl mb-6">
        Total Portfolio Value:{" "}
        <span className="text-success">${totalValue.toFixed(2)}</span>{" "}
        <span style={{ color: arrowColor, marginLeft: "0.5rem" }}>
          {arrowSymbol} ${Math.abs(profitLoss).toFixed(2)}
        </span>
      </p>

      {/* 1hr Chart */}
      {chartData ? (
        <div className="mb-6">
          <Line data={chartData} />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}

      {/* Add Holding Form */}
      <form onSubmit={handleAddHolding} className="mb-6">
        <div className="mb-3">
          <label htmlFor="symbol-select" className="block mb-1">
            Symbol:
          </label>
          <select
            id="symbol-select"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded p-2"
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="block mb-1">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pricePaid" className="block mb-1">
            Price Paid (USD):
          </label>
          <input
            id="pricePaid"
            type="number"
            step="any"
            value={pricePaid}
            onChange={(e) => setPricePaid(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Holding
        </button>
      </form>

      {/* Scrollable list of holdings */}
      <div
        className="border border-gray-600 rounded p-3"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {holdings.length === 0 ? (
          <p>No holdings added yet.</p>
        ) : (
          holdings.map((h, i) => {
            const paid = h.price_paid ?? h.pricePaid ?? 0;
            return (
              <div key={i} className="mb-2">
                <strong>{h.symbol.toUpperCase()}</strong>: {h.amount} @ ${paid.toFixed(2)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Portfolio;
