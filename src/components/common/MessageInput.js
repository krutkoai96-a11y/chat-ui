import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border rounded-full px-4 py-2 outline-none"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={e => e.key === "Enter" && send()}
      />

      <button
        className="bg-blue-500 text-white px-4 rounded-full hover:bg-blue-600"
        onClick={send}
      >
        Send
      </button>
    </div>
  );
}