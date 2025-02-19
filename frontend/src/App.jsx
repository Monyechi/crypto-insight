import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

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
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
