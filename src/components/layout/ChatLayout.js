import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { createConnection } from "../../services/signalr";
import { getChats, getMessages, getMe } from "../../services/api";

export default function ChatLayout({ token, onLogout }) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const activeChatRef = useRef(null);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // 🔹 текущий пользователь
  useEffect(() => {
    if (!token) return;

    getMe()
      .then(res => {
        localStorage.setItem("username", res.data.username);
      })
      .catch(console.error);
  }, [token]);

  // 🔹 загрузка чатов
  const loadChats = () => {
    getChats()
      .then(res => setChats(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    if (token) loadChats();
  }, [token]);

  // 🔌 SignalR
  useEffect(() => {
    if (!token) return;

    const conn = createConnection(token);

    conn.start()
      .then(() => {
        console.log("✅ SignalR Connected");
        setIsConnected(true);
      })
      .catch(console.error);

    conn.on("ReceiveMessage", (data) => {
      console.log("📩 MSG:", data);

      const currentChat = activeChatRef.current;

      const newMessage = {
        user: data.user,
        message: data.message,
        createdAt: data.createdAt
      };

      // 🔥 показываем только если открыт нужный чат
      if (
        currentChat &&
        currentChat.chatId.toString() === data.chatId.toString()
      ) {
        setMessages(prev => [...prev, newMessage]);
      }

      loadChats();
    });

    conn.onclose(() => setIsConnected(false));
    conn.onreconnecting(() => setIsConnected(false));
    conn.onreconnected(() => setIsConnected(true));

    setConnection(conn);

    return () => conn.stop();
  }, [token]);

  // 📂 открыть чат
  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    setSelectedUser(null);

    getMessages(chat.chatId)
      .then(res => setMessages(res.data))
      .catch(console.error);
  };

  // 👤 новый чат
  const handleSelectUser = (user) => {
    if (!user?.id) {
      console.error("❌ User has no id", user);
      return;
    }

    setSelectedUser(user);
    setActiveChat(null);
    setMessages([]);
  };

  // ✉️ отправка
  const sendMessage = async (text) => {
    if (!connection || !isConnected) return;
    if (!text.trim()) return;

    try {
      // существующий чат
      if (activeChat) {
        await connection.invoke(
          "SendMessage",
          activeChat.chatId,
          text
        );
      }
      // новый чат
      else if (selectedUser) {
        await connection.invoke(
          "SendPrivateMessage",
          selectedUser.id,
          text
        );
      } else {
        console.error("❌ No chat selected");
      }
    } catch (err) {
      console.error("❌ Send error:", err);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">

      <div className="w-80 min-w-[320px] border-r">
        <Sidebar
          token={token}
          chats={chats}
          activeChat={activeChat}
          onSelect={handleSelectChat}
          onSelectUser={handleSelectUser}
          onLogout={onLogout}
        />
      </div>

      <div className="flex-1">
        <ChatWindow
          activeChat={activeChat}
          selectedUser={selectedUser}
          messages={messages}
          onSend={sendMessage}
          isConnected={isConnected}
        />
      </div>

    </div>
  );
}