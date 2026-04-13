import { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔥 Fake users
  const chats = [
    { id: 1, name: "John Doe", online: true, unread: 2 },
    { id: 2, name: "Jane Smith", online: false, unread: 0 },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: "Hey!", time: "10:00 AM", seen: true },
    { id: 2, sender: "me", text: "What’s up?", time: "10:01 AM", seen: true },
  ]);

  // 🔥 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // 🔥 Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      seen: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // simulate typing + reply
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "them",
          text: "Nice 👀",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          seen: true,
        },
      ]);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen mt-16">
        {/* Sidebar */}
        <div className="w-1/3 border-r bg-white">
          <h2 className="p-4 font-bold text-lg">Messages</h2>

          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div>
                  <p className="font-semibold">{chat.name}</p>
                  <p className="text-sm text-gray-500">
                    {chat.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>

              {/* 🔥 Unread Badge */}
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="font-semibold">{selectedChat.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedChat.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "me" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                        msg.sender === "me"
                          ? "bg-blue-500 text-white"
                          : "bg-white border"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* 🔥 Timestamp + Seen */}
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      {msg.time}
                      {msg.sender === "me" && (
                        <span>{msg.seen ? "✔✔" : "✔"}</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* 🔥 Typing Indicator */}
                {typing && (
                  <div className="text-sm text-gray-500 italic">
                    {selectedChat.name} is typing...
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a chat to start messaging 💬
            </div>
          )}
        </div>
      </div>
       <Footer />
    </>
  );
}
