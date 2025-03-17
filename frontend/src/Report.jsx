"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Types and Constants
const TaskStatus = {
  COMPLETED: "completed",
  IN_PROGRESS: "in-progress",
  PENDING: "pending",
};

const ChartColors = {
  COMPLETED: "#a5be00",
  COMPLETED_DARK: "#679436",
  IN_PROGRESS: "#427aa1",
  IN_PROGRESS_DARK: "#05668d",
};

// Components
function TaskDonutChart({ chartData }) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="relative rounded-full h-[200px] w-[200px] max-md:mx-auto max-md:my-0">
        <div
          className="absolute rounded-full size-full"
          style={{
            background: `conic-gradient(
              ${chartData[0].color} 0deg ${chartData[0].value * 3.6}deg,
              ${chartData[1].color} ${chartData[0].value * 3.6}deg ${
                (chartData[0].value + chartData[1].value) * 3.6
              }deg,
              ${chartData[2].color} ${
                (chartData[0].value + chartData[1].value) * 3.6
              }deg 360deg
            )`,
          }}
          role="img"
          aria-label="Task completion donut chart"
        />
        <div
          className="absolute top-2/4 left-2/4 text-2xl font-semibold rounded-full -translate-x-2/4 -translate-y-2/4 h-[120px] w-[120px] flex items-center justify-center bg-white"
          aria-label="Total completion percentage"
        >
          100%
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {chartData?.map((section) => (
          <div
            className="flex gap-2 items-center"
            key={section.label}
            role="listitem"
          >
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: section.color }}
              aria-hidden="true"
            />
            <span>{section.label}</span>
            <span className="font-semibold">
              <span>{section.value}</span>
              <span>%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GanttChart({ tasks }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex pb-2.5 mb-5 border-b border-solid border-b-zinc-100">
        <div className="p-2 text-sm font-semibold w-[200px]">Tasks</div>
        <div className="flex relative flex-1">
          {Array.from({ length: 31 }).map((_, index) => (
            <div
              className="p-1 text-xs text-center border-r border-solid border-r-zinc-100 w-[30px]"
              key={index}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3" role="list">
        {tasks?.map((task) => (
          <div
            className="flex items-center min-h-10"
            key={task.id}
            role="listitem"
          >
            <div className="p-2 text-sm w-[200px]">{task.name}</div>
            <div className="relative flex-1 h-6">
              <div
                className="absolute h-full rounded opacity-80"
                style={{
                  left: `${new Date(task.startDate).getDate() * 30 - 30}px`,
                  width: `${
                    ((new Date(task.endDate) - new Date(task.startDate)) /
                      (1000 * 60 * 60 * 24)) *
                    30
                  }px`,
                  backgroundColor:
                    task.status === "completed"
                      ? ChartColors.COMPLETED
                      : ChartColors.IN_PROGRESS,
                }}
                role="progressbar"
                aria-valuenow={task.progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="h-full rounded"
                  style={{
                    width: `${task.progress}%`,
                    backgroundColor:
                      task.status === "completed"
                        ? ChartColors.COMPLETED_DARK
                        : ChartColors.IN_PROGRESS_DARK,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarGrid() {
  return (
    <section aria-label="Calendar View">
      <div className="flex gap-5 mb-2.5 font-medium">
        <div>March 2025</div>
        <div>April 2025</div>
      </div>
      <div className="grid gap-2 p-2.5 grid-cols-[repeat(7,1fr)] max-md:gap-1 max-sm:gap-0.5">
        <div className="flex flex-col gap-1 justify-center items-center p-2 bg-indigo-50 rounded-lg border border-solid border-zinc-100 min-h-[60px] max-sm:p-1 max-sm:min-h-[50px]">
          <div className="text-xs font-medium text-stone-500">MAR</div>
          <div className="text-base font-semibold">28</div>
        </div>
        {Array.from({ length: 45 }).map((_, index) => {
          const day = (index + 1) % 31 || 31;
          const isHighlighted = index === 5;

          return (
            <div
              key={index}
              className={`p-1 text-xs text-center border border-solid border-zinc-100 ${
                isHighlighted ? "bg-green-500" : ""
              }`}
              role="gridcell"
            >
              {day}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TaskTable() {
  return (
    <section className="overflow-x-auto" aria-label="Task List">
      <div className="grid p-4 font-semibold bg-indigo-50 grid-cols-[repeat(4,1fr)] rounded-[8px_8px_0_0] max-md:p-3 max-sm:p-2.5 max-sm:text-sm max-sm:min-w-[600px]">
        <div className="p-1.5">Task</div>
        <div className="p-1.5">Event</div>
        <div className="p-1.5">Assignee</div>
        <div className="p-1.5">Updated</div>
      </div>
      {[
        ["Zidio Project", "Inprogress", "Ankush", "5 March 2025"],
        ["Task Management", "New", "Ankush", "6 March 2025"],
        ["UI Development", "Completed", "Sarah", "7 March 2025"],
        ["API Integration", "In Review", "Mike", "8 March 2025"],
        ["Testing Phase", "In Progress", "Lisa", "9 March 2025"],
      ].map(([task, event, assignee, date], index) => (
        <div
          key={index}
          className="grid p-2.5 border-b border-solid border-b-zinc-100 grid-cols-[repeat(4,1fr)] max-sm:min-w-[600px]"
          role="row"
        >
          <div className="p-1.5">{task}</div>
          <div className="p-1.5">{event}</div>
          <div className="p-1.5">{assignee}</div>
          <div className="p-1.5">{date}</div>
        </div>
      ))}
    </section>
  );
}

// Main Component
function Report() {
  const [tasks] = useState(() => [
    {
      id: 1,
      name: "Project Planning",
      startDate: "2025-03-01",
      endDate: "2025-03-10",
      progress: 100,
      status: "completed",
    },
    {
      id: 2,
      name: "Design Phase",
      startDate: "2025-03-08",
      endDate: "2025-03-20",
      progress: 60,
      status: "in-progress",
    },
    {
      id: 3,
      name: "Development",
      startDate: "2025-03-15",
      endDate: "2025-04-10",
      progress: 30,
      status: "in-progress",
    },
  ]);

  const [chartData] = useState(() => [
    {
      label: "Completed",
      value: 35,
      color: "#a5be00",
    },
    {
      label: "In Progress",
      value: 40,
      color: "#427aa1",
    },
    {
      label: "Pending",
      value: 25,
      color: "#05668d",
    },
  ]);

  return (
    <main>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div className="p-7 mx-auto min-h-screen bg-indigo-50 max-w-[1440px] w-[92%] max-md:p-6 max-md:w-[90%] max-sm:p-4 max-sm:w-[94%]">
        <header className="flex justify-between items-center px-0 py-2.5 mb-5">
          <div className="flex gap-4 items-center">
            <img
              alt="Company Logo"
              src="https://cdn.builder.io/api/v1/image/assets%2F5df8c00e19744252b631cb11d36a5da1%2F1f76021343bc44d486e1385b513d20eb"
              className="object-contain overflow-hidden h-10 aspect-square w-[120px] max-sm:h-8 max-sm:w-[100px]"
            />
            <div
              className="w-0.5 h-6 bg-slate-500 max-sm:h-5"
              aria-hidden="true"
            />
            <h1 className="text-xl font-semibold text-slate-500 max-sm:text-base">
              REPORT ANALYTICS
            </h1>
          </div>
          <Link
            to="/"
            className="flex gap-2 items-center px-4 py-2 text-sm font-medium bg-lime-600 rounded-md cursor-pointer border-[none] duration-[0.2s] text-[white] transition-[background] max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
            aria-label="Go back to admin"
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
            <span>← Back</span>
          </Link>
        </header>

        <div className="flex gap-5 mb-6 max-md:flex-col max-md:gap-4 max-sm:gap-3 max-sm:mb-4">
          <section className="flex flex-col flex-1 gap-6 justify-between px-5 pt-5 pb-8 rounded-lg max-md:gap-5 max-md:px-5 max-md:pt-5 max-md:pb-6 max-sm:gap-4 max-sm:px-4 max-sm:pt-4 max-sm:pb-5">
            <TaskDonutChart chartData={chartData} />
          </section>

          <section className="overflow-x-auto p-5 rounded-lg flex-[2]">
            <GanttChart tasks={tasks} />
            <CalendarGrid />
          </section>
        </div>

        <section className="p-5 rounded-lg max-sm:overflow-x-auto">
          <TaskTable />
        </section>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/pixel?apiKey=5df8c00e19744252b631cb11d36a5da1"
        aria-hidden="true"
        alt=""
        role="presentation"
        width="0"
        height="0"
        className="inline-block overflow-hidden w-0 h-0 opacity-0 pointer-events-none"
      />
    </main>
  );
}

export default Report;
