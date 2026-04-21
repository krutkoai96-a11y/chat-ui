import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Chat App 💬
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Form */}
        {isLogin ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <RegisterForm onRegister={onLogin} />
        )}

        {/* Switch */}
        <div className="text-center mt-6">
          {isLogin ? (
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}