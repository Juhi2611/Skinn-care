// "use client";

// import { useState } from "react";

// export default function AIAssistant() {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//   if (!input.trim()) return;

//   setLoading(true);

//   try {
// const res = await fetch("/api/ai-agent", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ message: input }),
// });

//     const data = await res.json();

//     console.log("AI:", data);

//     setMessages((prev) => [...prev, input, data.reply || "No response"]);

//   } catch (err) {
//     console.error(err);
//     setMessages((prev) => [...prev, input, "Error occurred"]);
//   }

//   setInput("");
//   setLoading(false);
// };

//   return (
//     <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl p-4 z-50">
//       <div className="h-48 overflow-y-auto text-sm mb-2 space-y-2">
//         {messages.map((msg, i) => (
//           <div key={i} className={i % 2 === 0 ? "text-right" : "text-left"}>
//             {msg}
//           </div>
//         ))}
//         {loading && <p className="text-xs text-gray-400">Typing...</p>}
//       </div>

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Ask about skincare..."
//         className="w-full border rounded-lg p-2 text-sm"
//       />

//       <button
//         onClick={sendMessage}
//         className="mt-2 w-full bg-black text-white rounded-lg py-2 text-sm"
//       >
//         Ask AI
//       </button>
//     </div>
//   );
// }
