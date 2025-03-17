"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";


// Constants and Types
const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const COLUMNS = {
  NEW: "new",
  PROGRESS: "progress",
  EVENT: "event",
};

const DEFAULT_COLORS = {
  new: "#e3edf7",
  progress: "#f0f4f8",
  event: "#e3edf7",
};

// Nested Components
const TaskCard = ({ task, onComplete, isColoredBackground = false }) => {
  const getBorderColor = (priority) => {
    switch (priority) {
      case "low":
        return "#4ade80";
      case "medium":
        return "#fbbf24";
      case "high":
        return "#ef4444";
      default:
        return "#e5e7eb";
    }
  };

  return (
    <article
      className={`flex flex-col justify-between p-5 mb-4 rounded-xl min-h-40 ${
        isColoredBackground
          ? "text-white bg-slate-500"
          : "bg-white text-zinc-800"
      }`}
      style={
        !isColoredBackground
          ? {
              borderLeft: `4px solid ${getBorderColor(task.priority)}`,
            }
          : {}
      }
    >
      <div>
        <h3 className="mb-1 font-medium">{task.title}</h3>
        {task.description && (
          <p className="mb-2 text-sm text-stone-500">{task.description}</p>
        )}
        <div className="flex gap-2 items-center mb-3 text-sm">
          <i className="ti ti-calendar" aria-hidden="true" />
          <span>{task.dueDate || "No due date"}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          {task.assignedTo?.map((user, index) => (
            <img
              key={index}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`}
              alt={`${user}'s avatar`}
              className="w-6 h-6 rounded-full"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button className="cursor-pointer" aria-label="More options">
            <i className="ti ti-dots-vertical" aria-hidden="true" />
          </button>
          <button className="cursor-pointer" aria-label="Edit task">
            <i className="ti ti-pencil" aria-hidden="true" />
          </button>
          <button className="cursor-pointer" aria-label="Share task">
            <i className="ti ti-share" aria-hidden="true" />
          </button>
          <button
            className="transition-all cursor-pointer duration-[0.2s] ease-[ease]"
            onClick={() => onComplete(task.id, task.column)}
            aria-label="Complete task"
          >
            <i className="ti ti-check" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

const AddTaskButton = ({ onClick, column }) => {
  return (
    <button
      className="flex gap-2 justify-center items-center px-4 py-2 mx-auto my-0 w-auto h-10 text-sm font-medium text-white rounded-3xl transition-all cursor-pointer bg-slate-500 duration-[0.2s] ease-[ease] shadow-[0_2px_4px_rgba(0,0,0,0.1)] max-sm:justify-center max-sm:w-full"
      onClick={onClick}
      aria-label={`Add new task to ${column} column`}
    >
      <i className="ti ti-plus" aria-hidden="true" />
      <span className="text-sm font-medium">+ New Task</span>
    </button>
  );
};

const TaskModal = ({
  task,
  onClose,
  onCreate,
  position,
  showPriorityDropdown,
  onTogglePriority,
  onUpdateTask,
}) => {
  return (
    <div
      className="absolute p-6 bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[340px] z-[1000] max-sm:p-4 max-sm:w-[280px]"
      style={{
        top: position.y + "px",
        left: position.alignRight ? "auto" : position.x + "px",
        right: position.alignRight ? "20px" : "auto",
      }}
      role="dialog"
      aria-labelledby="modal-title"
    >
      <h3 id="modal-title" className="mb-4 text-lg">
        Create New Task
      </h3>

      <input
        type="text"
        placeholder="Task Name"
        className="px-3 py-2 mb-3 w-full rounded-md border border-solid border-slate-200"
        value={task.title}
        onChange={(e) => onUpdateTask({ ...task, title: e.target.value })}
        aria-label="Task name"
      />

      <textarea
        placeholder="Task Description"
        className="px-3 py-2 mb-3 w-full rounded-md border border-solid border-slate-200 min-h-[100px]"
        value={task.description}
        onChange={(e) => onUpdateTask({ ...task, description: e.target.value })}
        aria-label="Task description"
      />

      <div className="flex gap-3 mb-3">
        <input
          type="date"
          className="flex-1 px-3 py-2 rounded-md border border-solid border-slate-200"
          value={task.dueDate}
          onChange={(e) => onUpdateTask({ ...task, dueDate: e.target.value })}
          aria-label="Due date"
        />
        <input
          type="time"
          className="box-border flex-1 px-3 py-2 max-w-full rounded-md border border-solid border-slate-200 max-sm:w-full max-sm:min-w-[120px]"
          value={task.dueTime}
          onChange={(e) => onUpdateTask({ ...task, dueTime: e.target.value })}
          aria-label="Due time"
        />
      </div>

      <div className="relative mb-4">
        <button
          className="flex justify-between items-center px-3 py-2 w-full rounded-md border border-solid cursor-pointer border-slate-200"
          onClick={onTogglePriority}
          aria-expanded={showPriorityDropdown}
          aria-haspopup="listbox"
          style={{
            backgroundColor:
              task.priority === PRIORITY.LOW
                ? "#4ade80"
                : task.priority === PRIORITY.MEDIUM
                  ? "#fbbf24"
                  : task.priority === PRIORITY.HIGH
                    ? "#ef4444"
                    : "#fff",
            color: "#fff",
          }}
        >
          <span>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
            Priority
          </span>
          <i className="ti ti-chevron-down" aria-hidden="true" />
        </button>

        {showPriorityDropdown && (
          <div
            className="absolute left-0 top-full mt-1 w-full bg-white rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[1000]"
            role="listbox"
          >
            <button
              className="w-full px-3 py-2 text-white bg-green-400 rounded-t-md cursor-pointer"
              onClick={() => {
                onUpdateTask({ ...task, priority: PRIORITY.LOW });
                onTogglePriority();
              }}
              role="option"
              aria-selected={task.priority === PRIORITY.LOW}
            >
              Low Priority
            </button>
            <button
              className="w-full px-3 py-2 text-white bg-amber-400 cursor-pointer"
              onClick={() => {
                onUpdateTask({ ...task, priority: PRIORITY.MEDIUM });
                onTogglePriority();
              }}
              role="option"
              aria-selected={task.priority === PRIORITY.MEDIUM}
            >
              Medium Priority
            </button>
            <button
              className="w-full px-3 py-2 text-white bg-red-500 rounded-b-md cursor-pointer"
              onClick={() => {
                onUpdateTask({ ...task, priority: PRIORITY.HIGH });
                onTogglePriority();
              }}
              role="option"
              aria-selected={task.priority === PRIORITY.HIGH}
            >
              High Priority
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          className="px-4 py-2 rounded-md border border-solid cursor-pointer bg-slate-50 border-slate-200"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white rounded-md cursor-pointer bg-slate-500 border-[none]"
          onClick={onCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
};

const TaskColumn = ({
  title,
  tasks,
  color,
  onColorChange,
  onAddTask,
  onCompleteTask,
  taskCount,
}) => {
  return (
    <section
      className="overflow-auto flex-1 p-4 min-w-0 h-full rounded-xl"
      style={{ backgroundColor: color }}
      role="region"
      aria-label={`${title} tasks`}
    >
      <div className="flex flex-col">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={onCompleteTask} />
        ))}

        <AddTaskButton
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const modalWidth = 300;
            const spaceOnRight = viewportWidth - rect.right;
            const shouldPositionLeft = spaceOnRight < modalWidth + 20;

            onAddTask({
              x: shouldPositionLeft
                ? rect.left - modalWidth - 10
                : rect.right + 10,
              y: Math.max(0, rect.top),
              alignRight: shouldPositionLeft,
            });
          }}
          column={title}
        />
      </div>
    </section>
  );
};

const Header = ({
  onPeopleClick,
  showPeopleDropdown,
  acceptedMembers,
  onInviteClick,
  showInvitePopup,
  inviteEmail,
  onInviteEmailChange,
  onInviteSubmit,
  onInviteCancel,
  invitePosition,
}) => {
  return (
    <header className="flex justify-between items-center px-8 py-4 mb-10 bg-sky-800 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] max-sm:flex-col max-sm:gap-4 max-sm:p-4">
      <div className="flex relative gap-3 items-center mr-auto">
        <img
          alt="Company Logo"
          src="https://cdn.builder.io/api/v1/image/assets%2F5df8c00e19744252b631cb11d36a5da1%2F1f76021343bc44d486e1385b513d20eb"
          className="object-contain overflow-hidden h-10 aspect-square w-[120px] max-sm:h-8 max-sm:w-[100px]"
        />
      </div>

      <nav className="flex gap-3 items-center max-md:flex-wrap max-sm:justify-center max-sm:w-full">
        <button
          className="flex relative gap-1 items-center px-4 py-2 text-indigo-50 bg-lime-600 rounded-3xl cursor-pointer duration-[0.2s] ease-[ease] transition-[background-color]"
          onClick={onPeopleClick}
          aria-expanded={showPeopleDropdown}
          aria-haspopup="true"
        >
          <span>People</span>
          <i className="ti ti-chevron-down" aria-hidden="true" />

          {showPeopleDropdown && (
            <div className="absolute left-0 top-full px-0 py-2 mt-2 w-60 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[1000]">
              <h3 className="px-4 py-2 font-medium border-b border-solid border-b-slate-200 text-zinc-800">
                Team Members
              </h3>
              <ul>
                {acceptedMembers?.map((member) => (
                  <li
                    key={member.id}
                    className="flex gap-2 items-center px-4 py-2 text-zinc-800"
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={member.avatar}
                      alt={`${member.name}'s avatar`}
                    />
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-stone-500">
                        {member.email}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </button>

      


        <div className="flex items-center p-1 bg-white rounded-3xl max-sm:mx-0 max-sm:my-2.5 max-sm:w-full">
          <div className="flex gap-1 items-center px-2 py-1 mr-2 bg-blue-200 rounded-2xl">
            <span>In progress</span>
            <button aria-label="Clear filter">
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="p-1 border-[none]"
            aria-label="Search tasks"
          />
        </div>

        <button
          className="flex relative gap-1 items-center px-4 py-2 bg-blue-200 rounded-3xl cursor-pointer"
          onClick={onInviteClick}
          aria-expanded={showInvitePopup}
          aria-haspopup="dialog"
        >
          <span>Invite</span>
          <i className="ti ti-chevron-down" aria-hidden="true" />
        </button>

        {showInvitePopup && (
          <div
            className="absolute p-4 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] w-[280px] z-[1000] max-sm:left-2/4 max-sm:-translate-x-2/4 max-sm:w-[260px]"
            style={{
              top: invitePosition.y + "px",
              left: invitePosition.x + "px",
            }}
            role="dialog"
            aria-labelledby="invite-dialog-title"
          >
            <h3 id="invite-dialog-title" className="mb-3">
              Invite people to collaborate
            </h3>
            <input
              type="email"
              placeholder="Enter email address"
              className="p-2 mb-3 w-full rounded border border-solid border-slate-200"
              value={inviteEmail}
              onChange={onInviteEmailChange}
              aria-label="Email address"
            />
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-1.5 rounded border border-solid cursor-pointer bg-slate-50 border-slate-200"
                onClick={onInviteCancel}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 text-white rounded cursor-pointer bg-slate-500 border-[none]"
                onClick={onInviteSubmit}
              >
                Send Invite
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <div className="overflow-hidden w-8 h-8 rounded-full">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=random"
              alt="Profile Avatar"
              className="w-8 h-8 bg-gray-100 rounded-full"
            />
          </div>
          <button
            className="flex gap-2 items-center px-4 py-2 ml-2 text-white  bg-lime-600 rounded-lg cursor-pointer border-[none] duration-[0.2s] ease-[ease] transition-[background-color] max-sm:order-1 max-sm:justify-center max-sm:mb-2 max-sm:w-full"
            onClick={() => window.history.back()}
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
            <span>← Back</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

const AdminDashboard = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePosition, setInvitePosition] = useState({ x: 0, y: 0 });
  const [popupPosition, setPopupPosition] = useState({
    x: 0,
    y: 0,
    alignRight: false,
  });
  const [columnColors, setColumnColors] = useState(DEFAULT_COLORS);

  const [acceptedMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
  ]);

  const [tasksByColumn, setTasksByColumn] = useState({
    [COLUMNS.NEW]: [
      {
        id: 1,
        title: "Sample Task",
        description: "This is a sample task",
        priority: PRIORITY.MEDIUM,
        dueDate: "Not set",
        column: COLUMNS.NEW,
        createdAt: new Date().toISOString(),
      },
    ],
    [COLUMNS.PROGRESS]: [],
    [COLUMNS.EVENT]: [],
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: PRIORITY.MEDIUM,
    dueDate: "",
    dueTime: "",
    column: COLUMNS.NEW,
  });

  const completeTask = (taskId, column) => {
    setTasksByColumn((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  };

  const createNewTask = () => {
    if (!newTask.title) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      dueDate:
        newTask.dueDate && newTask.dueTime
          ? `${newTask.dueDate} ${newTask.dueTime}`
          : "Not set",
      column: newTask.column,
      createdAt: new Date().toISOString(),
    };

    setTasksByColumn((prev) => ({
      ...prev,
      [newTask.column]: [...prev[newTask.column], task],
    }));

    setNewTask({
      title: "",
      description: "",
      priority: PRIORITY.MEDIUM,
      dueDate: "",
      dueTime: "",
      column: newTask.column,
    });

    setShowTaskModal(false);
  };

  return (
    <main className="flex overflow-hidden flex-col p-8 mx-auto my-0 h-screen bg-indigo-50 max-w-[1440px] max-md:p-6 max-md:h-screen max-sm:p-4 max-sm:h-screen">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      />

      <Header
        onPeopleClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
        showPeopleDropdown={showPeopleDropdown}
        acceptedMembers={acceptedMembers}
        onInviteClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setInvitePosition({
            x: rect.left,
            y: rect.bottom + 8,
          });
          setShowInvitePopup(!showInvitePopup);
        }}
        showInvitePopup={showInvitePopup}
        inviteEmail={inviteEmail}
        onInviteEmailChange={(e) => setInviteEmail(e.target.value)}
        onInviteSubmit={() => {
          if (inviteEmail) {
            setShowInvitePopup(false);
            setInviteEmail("");
          }
        }}
        onInviteCancel={() => {
          setShowInvitePopup(false);
          setInviteEmail("");
        }}
        invitePosition={invitePosition}
      />

      <div className="flex overflow-auto flex-col gap-4 p-5 rounded-xl bg-slate-50 h-[calc(100vh_-_160px)] shadow-[0_4px_6px_rgba(0,0,0,0.05)] max-md:p-5 max-md:h-[calc(100vh_-_140px)] max-sm:gap-4 max-sm:p-4 max-sm:h-[calc(100vh_-_120px)]">
        <div className="flex mb-5 max-sm:flex-col">
          {Object.entries(COLUMNS).map(([key, value]) => (
            <button
              key={key}
              className="flex flex-1 gap-2 justify-center items-center px-4 py-3 text-center rounded-lg cursor-pointer duration-[0.3s] ease-[ease] transition-[background-color]"
              style={{ backgroundColor: columnColors[value] }}
              onClick={() => {
                setColumnColors((prev) => ({
                  ...prev,
                  [value]: prev[value] === "#e3edf7" ? "#f0f4f8" : "#e3edf7",
                }));
              }}
            >
              <span>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </span>
              <i
                className="ti ti-pencil ml-auto text-lg cursor-pointer"
                aria-hidden="true"
              />
              <span className="px-2 py-0.5 text-sm font-medium bg-white rounded-xl">
                {tasksByColumn[value].length}
              </span>
            </button>
          ))}
        </div>

        <div className="flex overflow-hidden gap-4 p-0 h-[calc(100vh_-_240px)] max-h-[calc(1024px_-_240px)] max-md:flex-col max-md:gap-5 max-md:p-0 max-md:h-auto max-md:max-h-none max-sm:gap-4">
          {Object.entries(COLUMNS).map(([key, value]) => (
            <TaskColumn
              key={key}
              title={key}
              tasks={tasksByColumn[value]}
              color={
                key === COLUMNS.NEW
                  ? "rgb(241 245 249)"
                  : key === COLUMNS.PROGRESS
                    ? "rgb(226 232 240)"
                    : "rgb(203 213 225)"
              }
              onColorChange={(color) =>
                setColumnColors((prev) => ({ ...prev, [value]: color }))
              }
              onAddTask={(position) => {
                setPopupPosition(position);
                setNewTask((prev) => ({ ...prev, column: value }));
                setShowTaskModal(true);
              }}
              onCompleteTask={completeTask}
              taskCount={tasksByColumn[value].length}
            />
          ))}
        </div>
      </div>

      {showTaskModal && (
        <TaskModal
          task={newTask}
          onClose={() => setShowTaskModal(false)}
          onCreate={createNewTask}
          position={popupPosition}
          showPriorityDropdown={showPriorityDropdown}
          onTogglePriority={() =>
            setShowPriorityDropdown(!showPriorityDropdown)
          }
          onUpdateTask={setNewTask}
        />
      )}
    </main>
  );
};

export default AdminDashboard;
