

export default function MessageList({ messages }) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`max-w-xs px-4 py-2 rounded-2xl 
            ${m.isMine
              ? "bg-blue-500 text-white self-end"
              : "bg-white text-black self-start"}`}
        >
          <div className="text-sm">{m.message}</div>
          <div className="text-xs opacity-70">
            {m.user}
          </div>
        </div>
      ))}
    </div>
  );
}