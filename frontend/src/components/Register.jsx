import React, { useState } from "react";
import { registerUser } from "../services/api";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    const result = await registerUser(username, password);
    setMessage(result.message);
    if (result.success) {
      onRegister();
    }
  };

  return (
    <div className="bg-card p-8 rounded-xl shadow-strong text-center max-w-md w-full mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>
      {message && <p className="text-danger mb-4">{message}</p>}
      <input
        type="text"
        placeholder="Username"
        className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-success hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200 ease-in-out shadow-md"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
