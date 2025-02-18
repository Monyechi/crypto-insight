import React, { useState, useEffect } from "react";
import { addHolding, getPortfolio, getPortfolioValue } from "../services/api";

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
    <div>
      <h2>Crypto Portfolio</h2>
      <p>Total Portfolio Value: <strong>${totalValue.toFixed(2)}</strong></p>
      <input type="text" placeholder="Symbol (e.g. bitcoin)" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleAddHolding}>Add Holding</button>

      <h3>Your Holdings</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((holding, index) => (
            <tr key={index}>
              <td>{holding.symbol}</td>
              <td>{holding.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
