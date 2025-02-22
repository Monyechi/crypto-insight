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
  const [symbol, setSymbol] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [pricePaid, setPricePaid] = useState("");

  const [holdings, setHoldings] = useState([]); // from GET /portfolio/
  const [totalValue, setTotalValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  const [chartData, setChartData] = useState(null);

  // On mount, fetch holdings and compute value
  useEffect(() => {
    fetchHoldings();
    fetchPortfolioValue();
  }, []);

  // If you still want a chart, you can re-generate it whenever holdings or totals change
  useEffect(() => {
    loadChartData();
  }, [holdings, totalValue]);

  // -------------------------------
  //      API CALLS
  // -------------------------------
  const token = localStorage.getItem("accessToken");

  const fetchHoldings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/crypto/portfolio/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHoldings(res.data);
    } catch (err) {
      console.error("Error fetching holdings:", err);
    }
  };

  const fetchPortfolioValue = async () => {
    try {
      const res = await axios.get("http://localhost:8000/crypto/portfolio/value/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalValue(res.data.total_value);
      setProfitLoss(res.data.profit_loss);
    } catch (err) {
      console.error("Error fetching portfolio value:", err);
    }
  };

  const addHoldingToBackend = async (symbol, amount, pricePaid) => {
    try {
      await axios.post(
        "http://localhost:8000/crypto/portfolio/add/",
        { symbol, amount, pricePaid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error adding holding:", err);
    }
  };

  // -------------------------------
  //      HANDLERS
  // -------------------------------
  const handleAddHolding = async (e) => {
    e.preventDefault();
    if (!amount || !pricePaid) return;

    // 1) Send to backend
    await addHoldingToBackend(symbol, amount, pricePaid);

    // 2) Refresh holdings + portfolio value
    fetchHoldings();
    fetchPortfolioValue();

    // 3) Reset form
    setSymbol("bitcoin");
    setAmount("");
    setPricePaid("");
  };

  // Example chart data
  const loadChartData = () => {
    // In a real app, you might fetch actual historical data or combine the totalValue
    const timestamps = ["10:00", "10:10", "10:20", "10:30", "10:40", "Now"];
    const values = [1000, 1200, 1150, 1300, 1400, totalValue];

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

  // Arrow logic
  const isProfit = profitLoss >= 0;
  const arrowSymbol = isProfit ? "↑" : "↓";
  const arrowColor = isProfit ? "green" : "red";

  // Calculate percentage change
  const percentageChange = ((profitLoss / (totalValue - profitLoss)) * 100).toFixed(2);

  // -------------------------------
  //      RENDER
  // -------------------------------
  return (
    <div className="bg-card p-6 rounded-xl shadow-strong w-full max-w-3xl text-center mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-primary">Portfolio</h2>

      <p className="text-2xl mb-6">
        Total Portfolio Value: <span className="text-success">${totalValue.toFixed(2)}</span>{" "}
        <span style={{ color: arrowColor, marginLeft: "0.5rem" }}>
          {arrowSymbol} ${Math.abs(profitLoss).toFixed(2)} ({percentageChange}%)
        </span>
      </p>

      {/* Chart */}
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
      <div className="border border-gray-600 rounded p-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
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
