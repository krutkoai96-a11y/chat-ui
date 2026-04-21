import React, { useState } from "react";
import { login } from "../../services/api";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await login({ username, password });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      
      <input
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>

    </div>
  );
}