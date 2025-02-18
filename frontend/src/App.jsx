import React from "react";
import CryptoPrices from "./components/CryptoPrices";
import CryptoChart from "./components/CryptoChart";

function App() {
  return (
    <div className="App">
      <h1>Crypto Market Analyzer</h1>
      <CryptoPrices />
      <CryptoChart symbol="bitcoin" />
      <CryptoChart symbol="ethereum" />
    </div>
  );
}

export default App;
