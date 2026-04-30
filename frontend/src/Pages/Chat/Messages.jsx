import { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { FiSend, FiMic, FiTrash2, FiEdit } from "react-icons/fi";
import profile1 from "../../assets/profile4.png";
import profile2 from "../../assets/profile5.png";
import profile3 from "../../assets/profile6.png";
import profile4 from "../../assets/profile7.png";
import profile5 from "../../assets/profile8.png";
import profile6 from "../../assets/profile9.png";
import profile7 from "../../assets/profile10.png";
import profile8 from "../../assets/profile11.png";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);

  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  // 🔥 Load messages (pagination simulation)
  useEffect(() => {
    loadMessages();
  }, [page]);

  const chats = [
    {
      id: 1,
      name: "Daniel Dee",
      online: true,
      unread: 2,
      avatar: profile1,
    },
    {
      id: 2,
      name: "Daniel",
      online: false,
      unread: 0,
      avatar: profile2,
    },
    {
      id: 3,
      name: "Prince",
      online: true,
      unread: 4,
      avatar: profile3,
    },
    {
      id: 4,
      name: "Dim Treasure",
      online: false,
      unread: 2,
      avatar: profile4,
    },
    {
      id: 5,
      name: "Shadrick",
      online: true,
      unread: 6,
      avatar: profile5,
    },
    {
      id: 6,
      name: "Philippe",
      online: true,
      unread: 1,
      avatar: profile6,
    },
    {
      id: 7,
      name: "Aribobo",
      online: false,
      unread: 3,
      avatar: profile7,
    },
    {
      id: 8,
      name: "Chima Mr Idol",
      online: true,
      unread: 5,
      avatar: profile8,
    },
  ];

  const loadMessages = () => {
    const fakeMessages = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      sender: i % 2 === 0 ? "me" : "them",
      text: "Older message " + i,
      type: "text",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "seen",
      seenAt: "9:1" + i,
      reactions: [],
    }));

    setMessages((prev) => [...fakeMessages, ...prev]);
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // 🔥 Send text
  const handleSend = () => {
    if (!input.trim()) return;

    const msg = {
      id: Date.now(),
      sender: "me",
      type: "text",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent", // sent → delivered → seen
      reactions: ["🔥"],
    };

    setMessages((prev) => [...prev, msg]);
    setInput("");

    // simulate delivery + seen
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: "delivered" } : m)),
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: "seen" } : m)),
      );
    }, 1500);

    simulateReply();
  };

  // 🔥 Image / Video Upload
  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const type = file.type.startsWith("video") ? "video" : "image";

    const msg = {
      id: Date.now(),
      sender: "me",
      type,
      url,
      time: "Now",
      status: "sent",
      reactions: [],
    };

    setMessages((prev) => [...prev, msg]);
  };

  // 🔥 Voice Recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);

      const msg = {
        id: Date.now(),
        sender: "me",
        type: "audio",
        url,
        time: "Now",
        reactions: [],
      };

      setMessages((prev) => [...prev, msg]);
      audioChunks.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // 🔥 Edit Message
  const editMessage = (id) => {
    const newText = prompt("Edit message:");
    if (!newText) return;

    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, text: newText } : m)),
    );
  };

  // 🔥 Delete Message
  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // 🔥 Simulate reply + seen
  const simulateReply = () => {
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      const reply = {
        id: Date.now() + 1,
        sender: "them",
        type: "text",
        text: "🔥 Got it!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "seen",
        seenAt: "Now",
        reactions: [],
      };

      setMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  // Add reaction
  const addReaction = (id, emoji) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, reactions: [...msg.reactions, emoji] } : msg,
      ),
    );
  };

  // Tick UI
  const renderStatus = (status) => {
    if (status === "sent") return "✔";
    if (status === "delivered") return "✔✔";
    if (status === "seen") return "✔✔";
  };

  return (
    <>
      <Navbar />

      <div className="flex h-screen mt-16 bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/3 border-r bg-white overflow-y-auto">
          <h2 className="p-5 font-bold text-lg">Messages</h2>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div>
                  <p className="font-semibold">{chat.name}</p>
                  <p className="text-xs text-gray-500">
                    {chat.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>

              {chat.unread > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="p-4 border-b font-semibold bg-white flex items-center gap-3 bg-white shadow-sm">
                <img
                  src={selectedChat.avatar}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{selectedChat.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedChat.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                onScroll={(e) => {
                  if (e.target.scrollTop === 0) {
                    setPage((p) => p + 1); // load older
                  }
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "me" ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Content */}
                    <div className="relative group">
                      <div className="bg-white p-3 rounded-xl shadow max-w-xs">
                        {msg.type === "text" && msg.text}

                        {msg.type === "image" && (
                          <img src={msg.url} className="rounded-lg max-h-60" />
                        )}

                        {msg.type === "video" && (
                          <video controls className="rounded-lg max-h-60">
                            <source src={msg.url} />
                          </video>
                        )}

                        {msg.type === "audio" && (
                          <audio controls src={msg.url} />
                        )}
                      </div>
                      {/* Reaction hover */}
                      <div className="absolute hidden group-hover:flex gap-1 -top-6 bg-white shadow px-2 py-1 rounded-full text-xs">
                        {["🔥", "😂", "❤️"].map((emoji) => (
                          <span
                            key={emoji}
                            className="cursor-pointer"
                            onClick={() => addReaction(msg.id, emoji)}
                          >
                            {emoji}
                          </span>
                        ))}
                      </div>
                      {/* Reactions */}
                      {msg.reactions.length > 0 && (
                        <div className="text-xs mt-1">
                          {msg.reactions.join(" ")}
                        </div>
                      )}

                      {/* Actions */}
                      {msg.sender === "me" && (
                        <div className="absolute hidden group-hover:flex gap-2 -top-6 right-0 bg-white shadow px-2 py-1 rounded">
                          <FiEdit
                            className="cursor-pointer"
                            onClick={() => editMessage(msg.id)}
                          />
                          <FiTrash2
                            className="cursor-pointer text-red-500"
                            onClick={() => deleteMessage(msg.id)}
                          />
                        </div>
                      )}
                    </div>
                    {/* Time + ticks */} {/* Meta */}
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      {msg.time}
                      {msg.sender === "me" && (
                        <span
                          className={
                            msg.status === "seen"
                              ? "text-blue-500"
                              : "text-gray-400"
                          }
                        >
                          {renderStatus(msg.status)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {typing && (
                  <p className="text-sm text-gray-500 italic animate-pulse">
                    {" "}
                    {selectedChat.name} is typing...
                  </p>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 flex gap-2 border-t bg-white items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Upload */}
                <input type="file" onChange={handleMedia} />

                {/* Voice */}
                <button
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  className={`p-2 rounded-full ${
                    recording ? "bg-red-500" : "bg-gray-200"
                  }`}
                >
                  <FiMic />
                </button>

                {/* Send */}
                <button
                  onClick={handleSend}
                  className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
                >
                  <FiSend />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              Select a chat to start messaging 💬
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
