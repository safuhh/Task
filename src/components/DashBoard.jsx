import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function DashBoard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(data);
  }, []);

  const totalEmployee = employees.length;
  const totalTask = tasks.length;

  const completedTask = tasks.filter((t) => t.status === "completed").length;
  const pendingTask = tasks.filter((t) => t.status === "pending").length;

  const overdueTask = tasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < new Date()
  ).length;

  const progressBar =
    totalTask === 0 ? 0 : Math.round((completedTask / totalTask) * 100);

  const Card = ({ title, value}) => (
    <div className="bg-white shadow-md rounded-xl p-4 border">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className={`text-2xl font-bold `}>{value}</p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar />

      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

      <div className="mb-6">
        <p className="mb-1 font-medium">Progress: {progressBar}%</p>
        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progressBar}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card title="Employees" value={totalEmployee} />
        <Card title="Total Tasks" value={totalTask} />
        <Card title="Completed" value={completedTask}/>
        <Card title="Pending" value={pendingTask} />
        <Card title="Overdue" value={overdueTask} />
      </div>
    </div>
  );
}