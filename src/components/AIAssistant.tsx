"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;

  setLoading(true);

  try {
const res = await fetch("/api/ai-agent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: input }),
});

    const data = await res.json();

    console.log("AI:", data);

    setMessages((prev) => [...prev, input, data.reply || "No response"]);

  } catch (err) {
    console.error(err);
    setMessages((prev) => [...prev, input, "Error occurred"]);
  }

  setInput("");
  setLoading(false);
};

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl p-4 z-50">

    </div>
  );
}
