"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const DEFAULT_COLUMN_COLORS = {
  new: "#e3edf7",
  progress: "#f0f4f8",
  event: "#e3edf7",
};

// Sub-components
const TaskCard = ({ task, onComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "#4ade80";
      case "medium":
        return "#fbbf24";
      case "high":
        return "#ef4444";
      default:
        return "#4ade80";
    }
  };

  return (
    <article
      className="flex flex-col justify-between p-5 mb-4 bg-white rounded-xl border-l-4 border-solid min-h-40 text-zinc-800"
      style={{
        borderLeftColor: getPriorityColor(task.priority),
      }}
    >
      <div>
        <h3 className="mb-1 font-medium">{task.title}</h3>
        <p className="mb-2 text-sm text-stone-500">{task.description}</p>
        <div className="flex gap-2 items-center mb-3 text-sm">
          <i className="ti ti-calendar" aria-hidden="true" />
          <time dateTime={task.dueDate}>{task.dueDate}</time>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center" />
        <div className="flex gap-2">
          <button className="ti ti-dots-vertical" aria-label="More options" />
          <button className="ti ti-pencil" aria-label="Edit task" />
          <button className="ti ti-share" aria-label="Share task" />
          <button
            className="ti ti-check transition-all cursor-pointer duration-[0.2s] ease-[ease]"
            title="Complete and remove task"
            onClick={() => onComplete(task.id, task.column)}
            aria-label="Complete task"
          />
        </div>
      </div>
    </article>
  );
};

const TaskColumn = ({
  title,
  tasks = [],
  color,
  onColorChange,
  taskCount,
  onTaskComplete,
}) => {
  return (
    <section
      className="overflow-auto flex-1 p-4 min-w-0 h-full rounded-xl"
      style={{ backgroundColor: color }}
      role="region"
      aria-label={`${title} tasks`}
    >
      <header className="flex gap-2 justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <button
          className="ti ti-pencil text-lg cursor-pointer"
          onClick={onColorChange}
          aria-label={`Change ${title} column color`}
        />
        <span className="px-2 py-0.5 text-sm font-medium bg-white rounded-xl">
          {taskCount}
        </span>
      </header>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onComplete={onTaskComplete} />
      ))}
    </section>
  );
};

const CreateTaskModal = ({
  task,
  onTaskChange,
  onClose,
  onSubmit,
  position,
  showPriorityDropdown,
  onTogglePriority,
  onSelectPriority,
}) => {
  return (
    <dialog
      className="absolute p-6 bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[340px] z-[1000] max-sm:p-4 max-sm:w-[280px]"
      style={{
        top: position.y + "px",
        left: position.alignRight ? "auto" : position.x + "px",
        right: position.alignRight ? "20px" : "auto",
      }}
      open
    >
      <h3 className="mb-4 text-lg">Create New Task</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Task Name"
          className="px-3 py-2 mb-3 w-full rounded-md border border-solid border-slate-200"
          value={task.title}
          onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
          aria-label="Task name"
        />
        <textarea
          placeholder="Task Description"
          className="px-3 py-2 mb-3 w-full rounded-md border border-solid border-slate-200 min-h-[100px]"
          value={task.description}
          onChange={(e) =>
            onTaskChange({ ...task, description: e.target.value })
          }
          aria-label="Task description"
        />
        <div className="flex gap-3 mb-3">
          <input
            type="date"
            className="flex-1 px-3 py-2 rounded-md border border-solid border-slate-200"
            value={task.dueDate}
            onChange={(e) => onTaskChange({ ...task, dueDate: e.target.value })}
            aria-label="Due date"
          />
          <input
            type="time"
            className="box-border flex-1 px-3 py-2 max-w-full rounded-md border border-solid border-slate-200 max-sm:w-full max-sm:min-w-[120px]"
            value={task.dueTime}
            onChange={(e) => onTaskChange({ ...task, dueTime: e.target.value })}
            aria-label="Due time"
          />
        </div>
        <div className="relative mb-4">
          <button
            type="button"
            className="flex justify-between items-center px-3 py-2 w-full text-white rounded-md border border-solid cursor-pointer border-slate-200"
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
                type="button"
                className="w-full px-3 py-2 text-white bg-green-400 rounded-t-md cursor-pointer text-left"
                onClick={() => onSelectPriority(PRIORITY.LOW)}
                role="option"
                aria-selected={task.priority === PRIORITY.LOW}
              >
                Low Priority
              </button>
              <button
                type="button"
                className="w-full px-3 py-2 text-white bg-amber-400 cursor-pointer text-left"
                onClick={() => onSelectPriority(PRIORITY.MEDIUM)}
                role="option"
                aria-selected={task.priority === PRIORITY.MEDIUM}
              >
                Medium Priority
              </button>
              <button
                type="button"
                className="w-full px-3 py-2 text-white bg-red-500 rounded-br-md rounded-bl-md cursor-pointer text-left"
                onClick={() => onSelectPriority(PRIORITY.HIGH)}
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
            type="button"
            className="px-4 py-2 rounded-md border border-solid cursor-pointer bg-slate-50 border-slate-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md cursor-pointer bg-slate-500 border-[none]"
          >
            Create
          </button>
        </div>
      </form>
    </dialog>
  );
};

const InviteModal = ({ position, email, onEmailChange, onClose, onSubmit }) => {
  return (
    <dialog
      className="absolute p-4 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] w-[280px] z-[1000] max-sm:left-2/4 max-sm:-translate-x-2/4 max-sm:w-[260px]"
      style={{
        top: position.y + "px",
        left: position.x + "px",
      }}
      open
    >
      <h3 className="mb-3">Invite people to collaborate</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="email"
          placeholder="Enter email address"
          className="p-2 mb-3 w-full rounded border border-solid border-slate-200"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          aria-label="Email address"
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-3 py-1.5 rounded border border-solid cursor-pointer bg-slate-50 border-slate-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-white rounded cursor-pointer bg-slate-500 border-[none]"
          >
            Send Invite
          </button>
        </div>
      </form>
    </dialog>
  );
};

const PeopleDropdown = ({ members, onClose }) => {
  return (
    <div
      className="absolute left-0 top-full px-0 py-2 mt-2 w-60 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[1000]"
      role="dialog"
      aria-label="Team members"
    >
      <h3 className="px-4 py-2 font-medium border-b border-solid border-b-slate-200 text-zinc-800">
        Team Members
      </h3>
      <ul role="list">
        {members?.map((member) => (
          <li
            className="flex gap-2 items-center px-4 py-2 text-zinc-800"
            key={member.id}
          >
            <img
              className="w-8 h-8 rounded-full"
              src={member.avatar}
              alt={`${member.name}'s avatar`}
            />
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-xs text-stone-500">{member.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main component
export const ViewerAdminDashboard = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [columnColors, setColumnColors] = useState(DEFAULT_COLUMN_COLORS);
  const [activeColumn, setActiveColumn] = useState(COLUMNS.NEW);

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
        title: "Design Review",
        description: "Review latest UI/UX designs for the dashboard",
        priority: PRIORITY.HIGH,
        dueDate: "Tomorrow 3:00 PM",
        column: COLUMNS.NEW,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Client Meeting Prep",
        description: "Prepare presentation and demos for client meeting",
        priority: PRIORITY.MEDIUM,
        dueDate: "Today 4:30 PM",
        column: COLUMNS.NEW,
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: "Documentation Update",
        description: "Update API documentation with new endpoints",
        priority: PRIORITY.LOW,
        dueDate: "Next Week",
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

  const [popupPosition, setPopupPosition] = useState({
    x: 0,
    y: 0,
    alignRight: false,
  });

  const [invitePosition, setInvitePosition] = useState({
    x: 0,
    y: 0,
  });

  function completeTask(taskId, column) {
    setTasksByColumn((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  }

  function createNewTask() {
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
      [task.column]: [...prev[task.column], task],
    }));

    setNewTask({
      title: "",
      description: "",
      priority: PRIORITY.MEDIUM,
      dueDate: "",
      dueTime: "",
      column: task.column,
    });

    setShowTaskModal(false);
  }

  return (
    <main className="flex overflow-hidden flex-col p-8 mx-auto my-0 h-screen bg-indigo-50 max-w-[1440px] max-md:p-6 max-md:h-screen max-sm:p-4 max-sm:h-screen">
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
            onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
            aria-expanded={showPeopleDropdown}
            aria-haspopup="dialog"
          >
            <span>People</span>
            <i className="ti ti-chevron-down" aria-hidden="true" />
            {showPeopleDropdown && (
              <PeopleDropdown
                members={acceptedMembers}
                onClose={() => setShowPeopleDropdown(false)}
              />
            )}
          </button>
  
          <div className="flex items-center p-1 bg-white rounded-3xl max-sm:mx-0 max-sm:my-2.5 max-sm:w-full">
            <div className="flex gap-1 items-center px-2 py-1 mr-2 bg-blue-200 rounded-2xl">
              <span>In progress</span>
              <button aria-label="Remove filter" className="ti ti-x" />
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
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setInvitePosition({
                x: rect.left,
                y: rect.bottom + 8,
              });
              setShowInvitePopup(!showInvitePopup);
            }}
            aria-expanded={showInvitePopup}
            aria-haspopup="dialog"
          >
            <span>Invite</span>
            <i className="ti ti-chevron-down" aria-hidden="true" />
          </button>

          {showInvitePopup && (
            <InviteModal
              position={invitePosition}
              email={inviteEmail}
              onEmailChange={setInviteEmail}
              onClose={() => {
                setShowInvitePopup(false);
                setInviteEmail("");
              }}
              onSubmit={() => {
                if (inviteEmail) {
                  setShowInvitePopup(false);
                  setInviteEmail("");
                }
              }}
            />
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
              className="flex gap-2 items-center px-4 py-2 ml-2 text-white bg-lime-600 rounded-lg cursor-pointer border-[none] duration-[0.2s] ease-[ease] transition-[background-color] max-sm:order-1 max-sm:justify-center max-sm:mb-2 max-sm:w-full"
              onClick={() => window.history.back()}
            >
              <i className="ti ti-arrow-left" aria-hidden="true" />
              <span>← Back</span>
            </button>
          </div>
        </nav>
      </header>

      <section className="flex overflow-auto flex-col gap-4 p-5 rounded-xl bg-slate-50 h-[calc(100vh_-_160px)] shadow-[0_4px_6px_rgba(0,0,0,0.05)] max-md:p-5 max-md:h-[calc(100vh_-_140px)] max-sm:gap-4 max-sm:p-4 max-sm:h-[calc(100vh_-_120px)]">
        <div className="flex mb-5 max-sm:flex-col">
          {Object.entries(COLUMNS).map(([key, value]) => (
            <button
              key={key}
              className="flex flex-1 gap-2 justify-center items-center px-4 py-3 text-center rounded-lg cursor-pointer duration-[0.3s] ease-[ease] min-w-[120px] transition-[background-color]"
              onClick={() => setActiveColumn(value)}
              style={{ backgroundColor: columnColors[value] }}
              aria-pressed={activeColumn === value}
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
              title={key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              tasks={tasksByColumn[value]}
              color={columnColors[value]}
              taskCount={tasksByColumn[value].length}
              onTaskComplete={completeTask}
              onColorChange={() => {
                // Color change logic here
              }}
            />
          ))}
        </div>

        {showTaskModal && (
          <CreateTaskModal
            task={newTask}
            onTaskChange={setNewTask}
            onClose={() => setShowTaskModal(false)}
            onSubmit={createNewTask}
            position={popupPosition}
            showPriorityDropdown={showPriorityDropdown}
            onTogglePriority={() =>
              setShowPriorityDropdown(!showPriorityDropdown)
            }
            onSelectPriority={(priority) => {
              setNewTask((prev) => ({ ...prev, priority }));
              setShowPriorityDropdown(false);
            }}
          />
        )}
      </section>
    </main>
  );
};

export default ViewerAdminDashboard;
