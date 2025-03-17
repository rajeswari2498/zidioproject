import React, { useState } from "react";
import Navbar from "../navbar/Navbar"; // Import Navbar
import "./message.css";

const ChatApp = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "General Chat", messages: [{ sender: "AK", text: "hi" }] },
    { id: 2, name: "Group Chat #1", messages: [] },
  ]);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    members: "",
    type: "Public",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleCreateGroup = () => {
    if (newGroup.name.trim() === "") return;
    const newGroupData = {
      id: groups.length + 1,
      name: newGroup.name,
      messages: [],
    };
    setGroups([...groups, newGroupData]);
    setShowPopup(false);
    setNewGroup({ name: "", members: "", type: "Public", description: "" });
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id
        ? {
            ...group,
            messages: [...group.messages, { sender: "MN", text: message }],
          }
        : group
    );
    setGroups(updatedGroups);
    setMessage("");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="chat-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="header">
            <h2>Chat</h2>
            <button onClick={() => setShowPopup(true)}>+</button>
          </div>
          <div className="chat-list">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`chat-item ${
                  selectedGroup.id === group.id ? "active" : ""
                }`}
                onClick={() => handleGroupClick(group)}
              >
                {group.name}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <h2>{selectedGroup.name}</h2>
          <div className="messages">
            {selectedGroup.messages.map((msg, index) => (
              <div key={index} className="message">
                <span className="avatar">{msg.sender}</span>
                <span className="text">{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>

        {/* Create Group Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Create Group</h3>
              <input
                type="text"
                placeholder="Group Name"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Members (comma separated)"
                value={newGroup.members}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, members: e.target.value })
                }
              />
              <select
                value={newGroup.type}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, type: e.target.value })
                }
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              <textarea
                placeholder="Description"
                value={newGroup.description}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, description: e.target.value })
                }
              />
              <button onClick={handleCreateGroup}>Create Group</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatApp;
