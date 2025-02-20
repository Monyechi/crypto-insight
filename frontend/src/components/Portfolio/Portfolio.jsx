import React, { useState, useEffect } from "react";
import { addHolding, getPortfolio, getPortfolioValue } from "../../services/api";

const Portfolio = () => {
  const [userId, setUserId] = useState("user123");
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    const data = await getPortfolio(userId);
    setPortfolio(data);
    const valueData = await getPortfolioValue(userId);
    setTotalValue(valueData.total_value);
  };

  const handleAddHolding = async () => {
    if (symbol && amount) {
      await addHolding(userId, symbol, parseFloat(amount));
      setSymbol("");
      setAmount("");
      loadPortfolio();
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-soft">
      <h2 className="text-2xl font-bold text-text mb-4">Crypto Portfolio</h2>
      <p className="text-xl mb-4">
        Total Portfolio Value: <span className="text-success">${totalValue.toFixed(2)}</span>
      </p>
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Symbol (e.g. bitcoin)"
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-text focus:ring-2 focus:ring-primary"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-text focus:ring-2 focus:ring-primary"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-4 rounded transition"
          onClick={handleAddHolding}
        >
          Add Holding
        </button>
      </div>
      <h3 className="text-xl font-bold text-text mt-6">Your Holdings</h3>
      <table className="w-full table-auto mt-4 text-text">
        <thead>
          <tr>
            <th className="border-b border-gray-600 py-2">Symbol</th>
            <th className="border-b border-gray-600 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((holding, index) => (
            <tr key={index}>
              <td className="py-2 border-b border-gray-600">{holding.symbol}</td>
              <td className="py-2 border-b border-gray-600">{holding.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
