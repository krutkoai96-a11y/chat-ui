import React, { useEffect, useRef, useState } from "react";

export default function ChatWindow({
  activeChat,
  selectedUser,
  messages,
  onSend,
  isConnected
}) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const myUsername = localStorage.getItem("username");

  // 🔽 авто-скролл
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  const getTitle = () => {
    if (activeChat) return activeChat.username;
    if (selectedUser) return selectedUser.username;
    return "Select a chat";
  };

  return (
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <div className="p-4 border-b font-semibold flex items-center gap-2">
        {getTitle()}
        <span className={`text-sm ${isConnected ? "text-green-500" : "text-red-500"}`}>
          {isConnected ? "● Online" : "● Connecting..."}
        </span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-gray-400 text-sm">
            No messages yet
          </div>
        )}

        {messages.map((msg, i) => {
          const isMe = msg.user === myUsername;

          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs break-words
                  ${isMe
                    ? "bg-blue-500 text-white"
                    : "bg-white border text-black"
                  }`}
              >
                {!isMe && (
                  <div className="text-xs text-gray-500 mb-1">
                    {msg.user}
                  </div>
                )}

                <div>{msg.message}</div>

                <div className="text-xs opacity-70 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!isConnected}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>

    </div>
  );
}