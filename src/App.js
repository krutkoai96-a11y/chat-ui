import React, { useState, useEffect } from "react";
import AuthPage from "./components/auth/AuthPage";
import ChatLayout from "./components/layout/ChatLayout";
import { setAuthToken } from "./services/api";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  /**
   * Устанавливаем токен в axios при старте и при изменении
   */
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  /**
   * Обработка логина
   * @param {string} newToken
   */
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setAuthToken(newToken);
  };

  /**
   * Обработка выхода
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthToken(null);
  };

  /**
   * Если нет токена — показываем авторизацию
   */
  if (!token) {
    return <AuthPage onLogin={handleLogin} />;
  }

  /**
   * Если есть токен — основной чат
   */
  return (
    <ChatLayout
      token={token}
      onLogout={handleLogout}
    />
  );
}