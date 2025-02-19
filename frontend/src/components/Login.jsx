import React, { useState } from "react";
import { loginUser } from "../services/api";
import "./Login.css"; // <-- Import the new CSS

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
    <div className="loginContainer">
      <h2 className="loginTitle">Welcome Back</h2>
      {message && <p className="loginMessage">{message}</p>}

      <input
        type="text"
        placeholder="Username"
        className="loginInput"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="loginInput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="loginButton" onClick={handleLogin}>
        Login
      </button>

      <p className="mt-6 text-gray-400">Don't have an account?</p>
      <button className="switchRegister" onClick={onSwitchToRegister}>
        Register Here
      </button>
    </div>
  );
};

export default Login;
