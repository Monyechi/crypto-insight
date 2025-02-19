import React, { useState } from "react";
import "./AppStyles.css"; // <-- Import your new CSS file
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
    <div className="appContainer">
      <h1 className="appTitle">Crypto Market Analyzer</h1>

      <div>
        {!token ? (
          isRegistering ? (
            <Register onRegister={() => setIsRegistering(false)} />
          ) : (
            <Login
              onLogin={setToken}
              onSwitchToRegister={() => setIsRegistering(true)}
            />
          )
        ) : (
          <Dashboard onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;
