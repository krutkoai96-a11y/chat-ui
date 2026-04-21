import React, { useState } from "react";
import { register } from "../../services/api";

export default function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await register({ username, password });
      localStorage.setItem("token", res.data.token);
      onRegister(res.data.token);
    } catch {
      alert("Register failed");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      
      <input
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Register
      </button>

    </div>
  );
}