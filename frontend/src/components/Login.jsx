import React, { useState } from "react";
import { loginUser } from "../services/api";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const result = await loginUser(username, password);
    if (result.success) {
      onLogin(result.token);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center max-w-md w-full">
      <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
      {message && <p className="text-red-500 mb-3">{message}</p>}
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-4 text-gray-400">Don't have an account?</p>
      <button
        className="text-blue-400 hover:underline"
        onClick={onSwitchToRegister}
      >
        Register Here
      </button>
    </div>
  );
};

export default Login;
