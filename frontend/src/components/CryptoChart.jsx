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
      labels: data.map((entry) => new Date(entry.timestamp).toLocaleTimeString()), // X-axis (time)
      datasets: [
        {
          label: `${symbol.toUpperCase()} Price (USD)`,
          data: data.map((entry) => entry.price), // Y-axis (price)
          borderColor: "blue",
          fill: false,
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div>
      <h3>{symbol.toUpperCase()} Price Chart</h3>
      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default CryptoChart;
