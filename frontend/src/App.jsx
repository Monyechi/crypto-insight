import React, { useState } from "react";
import CryptoPrices from "./components/CryptoPrices";
import CryptoChart from "./components/CryptoChart";
import Portfolio from "./components/Portfolio";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <div className="App">
      <h1>Crypto Market Analyzer</h1>
      
      {!token ? (
        isRegistering ? (
          <Register onRegister={() => setIsRegistering(false)} />
        ) : (
          <Login onLogin={setToken} onSwitchToRegister={() => setIsRegistering(true)} />
        )
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <CryptoPrices />
          <CryptoChart symbol="bitcoin" />
          <CryptoChart symbol="ethereum" />
          <Portfolio />
        </>
      )}
    </div>
  );
}

export default App;
