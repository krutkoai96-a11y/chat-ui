import React, { useEffect, useState } from "react";
import { getUsers, getMe } from "../../services/api";

export default function Sidebar({
  token,
  chats,
  activeChat,
  onSelect,
  onSelectUser,
  onLogout
}) {
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null); // 👈 текущий пользователь

  // 🔹 получаем текущего пользователя
  useEffect(() => {
    if (!token) return;

    getMe(token)
      .then(res => {
        setMe(res.data);

        // 🔥 фикс для ChatWindow (чтобы не было GUID)
        localStorage.setItem("username", res.data.username);
      })
      .catch(err => console.error("Me error:", err));
  }, [token]);

  // 🔹 загрузка пользователей (для нового чата)
  useEffect(() => {
    if (showUsers) {
      getUsers(token)
        .then(res => setUsers(res.data))
        .catch(err => console.error("Users error:", err));
    }
  }, [showUsers, token]);

  return (
    <div className="w-80 bg-white border-r flex flex-col h-screen">

      {/* HEADER */}
      <div className="p-4 border-b flex justify-between items-center">
        
        <div>
          <div className="text-lg font-bold">Chats</div>

          {/* 👇 имя текущего пользователя */}
          <div className="text-sm text-gray-500">
            {me ? me.username : "Loading..."}
          </div>
        </div>

        <div className="flex gap-2">
          {/* ➕ Новый чат */}
          <button
            onClick={() => setShowUsers(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            +
          </button>

          {/* 🚪 Logout */}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            ⎋
          </button>
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 && (
          <div className="p-4 text-gray-400 text-sm">
            No chats yet
          </div>
        )}

        {chats.map(c => (
          <div
            key={c.chatId}
            onClick={() => onSelect(c)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-100 transition
              ${activeChat?.chatId === c.chatId ? "bg-gray-200" : ""}`}
          >
            <div className="font-semibold">
              {c.username}
            </div>

            <div className="text-sm text-gray-500 truncate">
              {c.lastMessage || "No messages"}
            </div>
          </div>
        ))}
      </div>

      {/* USERS MODAL */}
      {showUsers && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">

          <div className="bg-white w-80 rounded-xl p-4 shadow-lg">

            <h3 className="font-bold mb-3">Start new chat</h3>

            <div className="max-h-60 overflow-y-auto">
              {users.length === 0 && (
                <div className="text-sm text-gray-400">
                  No users found
                </div>
              )}

              {users.map(u => (
                <div
                  key={u.id}
                  onClick={() => {
                    onSelectUser(u);
                    setShowUsers(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded transition"
                >
                  {u.username}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowUsers(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}