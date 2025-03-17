"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const emojis = ["😊", "😂", "👍", "❤️", "🎉", "👋", "🤔", "😎"];

const sections = [
  {
    id: "general",
    name: "General Chat",
    message: "hi!",
    icon: "message-circle",
  },
  {
    id: "ankush",
    name: "Ankush (it's you)",
    message: "",
    icon: "user",
  },
  {
    id: "mani",
    name: "Mani",
    message: "User",
    icon: "user",
  },
];

const initialFiles = [
  { name: "Document.pdf", size: "2.3 MB" },
  { name: "Image.jpg", size: "1.1 MB" },
  { name: "Report.docx", size: "856 KB" },
];

const ChatHeader = ({
  showSearch,
  onToggleSearch,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="flex justify-between items-center px-6 py-3 text-indigo-50 bg-sky-800 border-b border-solid border-b-slate-500">
      <div className="flex items-center">
        <div className="flex justify-center items-center mr-3 w-10 h-10 text-white bg-indigo-600 rounded-full">
          AK
        </div>
        <div className="flex gap-3 items-center">
          <div className="font-medium">
            <span>Ankush</span>
            <div className="text-xs text-indigo-50 opacity-80">User</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center text-base text-indigo-50 transition-all duration-200 ease-in-out">
        {showSearch && (
          <input
            className="px-2 py-1 text-sm text-sky-800 bg-indigo-50 rounded border border-solid border-slate-500"
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search messages"
          />
        )}
        <button
          onClick={onToggleSearch}
          className="p-2 rounded-full hover:bg-sky-700 transition-colors"
          aria-label={showSearch ? "Close search" : "Open search"}
        >
          <i
            className="ti ti-search"
            style={{
              color: showSearch ? "#A5BE00" : "#EBF2FA",
            }}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div
      className="flex overflow-y-auto flex-col grow p-6 bg-indigo-50"
      role="log"
      aria-label="Chat messages"
    >
      {messages.map((message, index) => (
        <article
          key={`${message.sender}-${message.time}-${index}`}
          className="flex gap-2 items-start mb-4"
          style={{
            flexDirection: message.isMe ? "row-reverse" : "row",
          }}
        >
          <div
            className="flex justify-center items-center w-10 h-10 text-sm text-white bg-indigo-600 rounded-full"
            aria-hidden="true"
          >
            {message.sender}
          </div>

          <div
            className="flex flex-col max-w-[70%]"
            style={{
              alignItems: message.isMe ? "flex-end" : "flex-start",
            }}
          >
            <div
              className="px-4 py-2.5 max-w-full text-sm leading-snug text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
              style={{
                backgroundColor: message.isMe ? "#679436" : "#05668D",
                borderRadius: message.isMe
                  ? "12px 12px 0 12px"
                  : "12px 12px 12px 0",
              }}
            >
              {message.text}
            </div>
            <time className="mt-1 text-xs text-gray-500">{message.time}</time>
          </div>
        </article>
      ))}
    </div>
  );
};

const MessageInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFolder, setShowFolder] = useState(false);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage(newMessage + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <footer className="flex items-center px-6 py-4 bg-sky-800 border-t border-b border-solid border-y-slate-500 max-sm:px-4 max-sm:py-3">
      <div className="flex grow items-center px-4 py-2 mr-3 bg-indigo-50 rounded-xl border border-solid transition-all border-slate-500 duration-200 ease-in-out">
        <div className="relative">
          <button
            className="p-1 text-xl rounded transition-all duration-200 ease-in-out text-slate-500 hover:bg-gray-200"
            onClick={() => {
              setShowFolder(!showFolder);
              setShowEmojiPicker(false);
            }}
            aria-label="Attach file"
            aria-expanded={showFolder}
          >
            <i className="ti ti-folder" aria-hidden="true" />
          </button>

          {showFolder && (
            <div className="absolute left-0 bottom-full p-2 mb-2 bg-white rounded-lg border border-solid border-slate-500 min-w-60 shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-[1000]">
              <div className="pb-2 mb-2 border-b border-solid">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  aria-label="Upload file"
                />
                <button
                  className="flex gap-2 items-center px-3 py-2 w-full text-sky-800 rounded hover:bg-gray-100"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <i className="ti ti-upload" aria-hidden="true" />
                  <span>Upload File</span>
                </button>
                <button className="flex gap-2 items-center px-3 py-2 w-full text-sky-800 rounded hover:bg-gray-100">
                  <i className="ti ti-folder-plus" aria-hidden="true" />
                  <span>New Folder</span>
                </button>
              </div>

              {initialFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-100"
                  role="button"
                  tabIndex={0}
                >
                  <i
                    className="ti ti-file mr-2 text-slate-500"
                    aria-hidden="true"
                  />
                  <div className="grow">
                    <div className="text-sm text-sky-800">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.size}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          className="grow mx-3 my-0 text-sky-800 border-none bg-transparent focus:outline-none"
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          aria-label="Message input"
        />

        <div className="relative">
          {showEmojiPicker && (
            <div className="grid absolute right-0 bottom-full gap-2 p-2 mb-2 bg-white rounded-lg border border-solid border-slate-500 grid-cols-[repeat(4,1fr)] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  className="p-1 text-xl rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => addEmoji(emoji)}
                  aria-label={`Add emoji ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Open emoji picker"
            aria-expanded={showEmojiPicker}
          >
            <i
              className="ti ti-mood-smile text-xl text-gray-500"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <button
        className="flex justify-center items-center w-10 h-10 text-white bg-lime-500 rounded-full transition-all duration-200 ease-in-out hover:bg-lime-600"
        onClick={handleSend}
        aria-label="Send message"
      >
        <i
          className="ti ti-send text-xl transition-transform duration-200 ease-in-out"
          aria-hidden="true"
        />
        {newMessage && (
          <div className="overflow-hidden absolute right-0 bottom-full px-2 py-1 mb-2 text-xs text-sky-800 whitespace-nowrap bg-indigo-50 rounded border border-solid border-slate-500 max-w-[200px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] text-ellipsis">
            {newMessage}
          </div>
        )}
      </button>
    </footer>
  );
};

const Sidebar = ({ currentPage, onPageChange }) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <aside className="flex flex-col w-80 bg-sky-800 border-r border-solid border-r-slate-500 max-md:w-[280px] max-sm:hidden">
      <div className="px-3 py-2 border-b border-solid bg-slate-500 border-b-gray-900">
        <div className="mb-2" />
        <div className="flex items-center px-3 py-2 bg-indigo-50 rounded-md">
          <i className="ti ti-search text-base text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="grow mx-2 my-0 border-none bg-transparent focus:outline-none"
            aria-label="Search conversations"
          />
        </div>
      </div>

      <nav className="flex relative flex-col grow mt-0.5 bg-slate-500 h-[calc(100vh_-_73px)] max-md:h-[calc(100vh_-_65px)]">
        <div className="overflow-y-auto grow pb-20">
          {sections.map((section) => (
            <button
              key={section.id}
              className="flex relative items-center w-full px-4 py-3 text-left border-solid transition-all cursor-pointer border-l-[3px] border-l-transparent duration-200 ease-in-out hover:bg-sky-700"
              onClick={() => onPageChange(section.id)}
              aria-selected={currentPage === section.id}
              style={{
                backgroundColor:
                  currentPage === section.id ? "#679436" : "transparent",
                color: currentPage === section.id ? "#ffffff" : "#EBF2FA",
              }}
            >
              <div className="flex justify-center items-center mr-3 w-10 h-10 bg-gray-100 rounded-full">
                <i
                  className={`ti ti-${section.icon} text-xl text-sky-800`}
                  aria-hidden="true"
                />
              </div>
              <div className="grow">
                <div className="mb-1 text-sm font-medium">{section.name}</div>
                <div className="text-xs text-indigo-50">{section.message}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          className="absolute inset-x-4 bottom-4 z-10 flex gap-1.5 justify-center items-center px-4 py-3 text-sm font-medium text-white bg-lime-600 rounded-md transition-all cursor-pointer border-none duration-200 ease-in-out hover:bg-lime-700 shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
          onClick={handleBackToDashboard}
        >
          <i className="ti ti-arrow-left text-sm" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </button>
      </nav>
    </aside>
  );
};

const MainChat = ({ messages, onSendMessage, searchQuery, onSearchChange }) => {
  const [showSearch, setShowSearch] = useState(false);

  const filteredMessages = searchQuery
    ? messages.filter((msg) =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : messages;

  return (
    <section className="flex flex-col grow bg-white max-sm:w-full">
      <ChatHeader
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch(!showSearch)}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <MessageList messages={filteredMessages} />

      <MessageInput onSendMessage={onSendMessage} />
    </section>
  );
};

const Communication = () => {
  const [currentPage, setCurrentPage] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "MN",
      text: "Hi there!",
      time: "9:45 am",
      isMe: false,
    },
    {
      sender: "AK",
      text: "Hey! How are you?",
      time: "9:46 am",
      isMe: true,
    },
    {
      sender: "MN",
      text: "I'm good, thanks! How about you?",
      time: "9:47 am",
      isMe: false,
    },
  ]);

  const handleSendMessage = (newMessage) => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        sender: "AK",
        text: newMessage,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        isMe: true,
      },
    ]);
  };

  return (
    <div className="h-screen bg-gray-900">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="flex h-full">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <MainChat
          messages={messages}
          onSendMessage={handleSendMessage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </main>
    </div>
  );
};

export default Communication;
