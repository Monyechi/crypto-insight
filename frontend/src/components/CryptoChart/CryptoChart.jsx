import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchHistoricalPrices } from "../../services/api";
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
import "./CryptoChart.css"; // <-- Import your new CSS

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const CryptoChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    loadHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  const loadHistoricalData = async () => {
    const data = await fetchHistoricalPrices(symbol);
    if (data.length === 0) return;

    setChartData({
      labels: data.map((entry) => new Date(entry.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: `${symbol.toUpperCase()} Price (USD)`,
          data: data.map((entry) => entry.price),
          borderColor: "#3b82f6", // or your preferred "primary" color
          fill: false,
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div className="crypto-chart-container">
      <h3 className="crypto-chart-title">{symbol.toUpperCase()} Price Chart</h3>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p className="crypto-chart-loading">Loading chart...</p>
      )}
    </div>
  );
};

export default CryptoChart;
