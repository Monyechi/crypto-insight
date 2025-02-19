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
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {message && <p className="text-red-500 mb-3">{message}</p>}
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600 text-white"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
