import axios from "axios";

/**
 * Базовый URL API
 */
const API_URL = "http://localhost:5000/api";

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: API_URL
});

/**
 * 🔥 АВТОМАТИЧЕСКАЯ ПОДСТАНОВКА JWT
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Сохранение токена
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

//
// 🔐 AUTH
//

export const login = async (data) => {
  const response = await api.post("/auth/login", data);

  const token = response.data.token;
  setAuthToken(token);

  return response;
};

export const register = async (data) => {
  const response = await api.post("/auth/register", data);

  const token = response.data.token;
  setAuthToken(token);

  return response;
};

//
// 👤 USERS
//

export const getMe = () => api.get("/users/me");

export const getUsers = () => api.get("/users");

//
// 💬 CHATS
//

export const getChats = () => api.get("/chats");

//
// 📩 MESSAGES
//

export const getMessages = (chatId) =>
  api.get(`/messages/${chatId}`);

export const getPrivateMessages = (userId) =>
  api.get(`/messages/private/${userId}`);

export default api;