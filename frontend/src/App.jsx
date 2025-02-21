// App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // <-- import from react-router-dom
import "./AppStyles.css"; 
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Portfolio from "./components/Portfolio/Portfolio"; // <-- new separate page
import Navbar from "./components/Navbar/Navbar";  
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  // If not logged in, just show login/register
  if (!token) {
    return (
      <>
        <Navbar onLogout={handleLogout} />
        <div className="appContainer">
          <h1 className="appTitle">Crypto Insight</h1>
          {isRegistering ? (
            <Register onRegister={() => setIsRegistering(false)} />
          ) : (
            <Login
              onLogin={setToken}
              onSwitchToRegister={() => setIsRegistering(true)}
            />
          )}
        </div>
      </>
    );
  }

  // If logged in, show the routes for dashboard & portfolio
  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="appContainer">
        <h1 className="appTitle">Crypto Insight</h1>
        <Routes>
          {/* By default, show Dashboard if user goes to "/" */}
          <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
