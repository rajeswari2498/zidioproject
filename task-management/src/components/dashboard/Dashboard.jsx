import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Navbar from "../navbar/Navbar";
import "./dashboard.css";

const Dashboard = () => {
  // Fetch the logged-in user's email from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = storedUser?.email;

  // Initialize state for tasks
  const [tasks, setTasks] = useState({
    new: [],
    inProgress: [],
    review: [],
    completed: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", dateTime: "" });
  const [selectedColumn, setSelectedColumn] = useState("new");

  // Load tasks from localStorage when userEmail changes
  useEffect(() => {
    if (!userEmail) return; // Ensure userEmail exists
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${userEmail}`)) || {
      new: [],
      inProgress: [],
      review: [],
      completed: [],
    };
    setTasks(savedTasks);
  }, [userEmail]);

  // Save tasks to localStorage
  const saveTasks = (updatedTasks) => {
    if (!userEmail) return;
    localStorage.setItem(`tasks_${userEmail}`, JSON.stringify(updatedTasks));
  };

  // Handle logout: Clear tasks and redirect
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user info
    setTasks({ new: [], inProgress: [], review: [], completed: [] }); // Reset tasks
    window.location.href = "/login"; // Redirect to login
  };

  // Handle drag-and-drop functionality
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === "completed") return;

    const updatedTasks = { ...tasks };
    const sourceTasks = [...updatedTasks[source.droppableId]];
    const movedTask = sourceTasks.splice(source.index, 1)[0];

    if (destination.droppableId === "completed") {
      updatedTasks["completed"] = [...updatedTasks["completed"], movedTask];
    } else {
      const destTasks = [...updatedTasks[destination.droppableId]];
      destTasks.splice(destination.index, 0, movedTask);
      updatedTasks[destination.droppableId] = destTasks;
    }

    updatedTasks[source.droppableId] = sourceTasks;
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Open modal for adding tasks
  const openModal = (column) => {
    setSelectedColumn(column);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setNewTask({ title: "", description: "", dateTime: "" });
  };

  // Add new task
  const addTask = () => {
    if (newTask.title.trim() === "") return;

    const updatedTasks = { ...tasks };
    updatedTasks[selectedColumn].push({ id: `task-${Date.now()}`, ...newTask });

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    closeModal();
  };

  return (
    <div className="dashboard">
      <Navbar handleLogout={handleLogout} />
      <div className="main-card">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board">
            {["new", "inProgress", "review", "completed"].map((column) => (
              <Droppable key={column} droppableId={column}>
                {(provided) => (
                  <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="column-header">
                      <h3>
                        {column === "new" ? "New" :
                         column === "inProgress" ? "In Progress" :
                         column === "review" ? "Review" :
                         "Completed"}
                      </h3>
                      {column !== "completed" && (
                        <button className="add-btn" onClick={() => openModal(column)}>+</button>
                      )}
                    </div>
                    <div className="task-list">
                      {tasks[column].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={column === "completed"}>
                          {(provided) => (
                            <div
                              className={`task-item ${column === "completed" ? "locked-task" : ""}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h4>{task.title}</h4>
                              <p>{task.description}</p>
                              <small>{task.dateTime}</small>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {showModal && (
        <div className="modal-overlay active">
          <div className="modal">
            <h3>Add Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            ></textarea>
            <input
              type="datetime-local"
              value={newTask.dateTime}
              onChange={(e) => setNewTask({ ...newTask, dateTime: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={addTask}>Add</button>
              <button onClick={closeModal} className="cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
