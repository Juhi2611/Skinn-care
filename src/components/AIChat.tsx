"use client";
import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = async () => {
  console.log("📤 Sending...");

  const res = await fetch("/api/ai-agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  console.log("📥 Response:", data);

  setChat((prev) => [
    ...prev,
    "You: " + message,
    "AI: " + data.reply,
  ]);

  setMessage("");
};

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-xl rounded-xl w-80">
      <div className="h-40 overflow-y-auto text-sm">
        {chat.map((c, i) => <p key={i}>{c}</p>)}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border w-full mt-2 p-1"
      />
      <button onClick={sendMessage} className="mt-2 w-full bg-black text-white p-2">
        Send
      </button>
    </div>
  );
}