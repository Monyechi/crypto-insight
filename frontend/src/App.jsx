// App.jsx
import React, { useState } from "react";
import "./AppStyles.css"; 
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";  // <-- import
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <div className="appContainer">
      {/* Render the navbar at the top */}
      <Navbar />

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
