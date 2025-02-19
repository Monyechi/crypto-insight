import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchHistoricalPrices } from "../services/api";
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

const CryptoChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    loadHistoricalData();
  }, [symbol]);

  const loadHistoricalData = async () => {
    const data = await fetchHistoricalPrices(symbol);
    if (data.length === 0) return;
    setChartData({
      labels: data.map((entry) =>
        new Date(entry.timestamp).toLocaleTimeString()
      ),
      datasets: [
        {
          label: `${symbol.toUpperCase()} Price (USD)`,
          data: data.map((entry) => entry.price),
          borderColor: "var(--tw-color-primary)", // using your primary color
          fill: false,
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-soft my-4">
      <h3 className="text-xl font-semibold text-white mb-2">
        {symbol.toUpperCase()} Price Chart
      </h3>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p className="text-gray-400">Loading chart...</p>
      )}
    </div>
  );
};

export default CryptoChart;
