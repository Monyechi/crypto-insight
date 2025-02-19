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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-blue-500">Crypto Market Analyzer</h1>

      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
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
    </div>
  );
}

export default App;
