import React, { useEffect, useState } from "react";

export default function TaskForm() {
  const [employees, setEmployees] = useState([]);

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [task, setTask] = useState({
    _id: "",
    tittle: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
  });

  const [editingTask, setEditingTask] = useState(false);

  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const assignTask = () => {
    if (!task.tittle || !task.dueDate) return;

    const newtask = {
      ...task,
      _id: crypto.randomUUID(),
    };

    setTasks([...tasks, newtask]);

    setTask({
      _id: "",
      tittle: "",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: "",
      assignedTo: "",
    });
  };

  const editingTasks = (t) => {
    setTask(t);
    setEditingTask(true);
  };

  const updateTask = () => {
    setTasks(
      tasks.map((e) => (e._id === task._id ? task : e))
    );
    setEditingTask(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const markCompleted = (id) => {
    setTasks(
      tasks.map((t) =>
        t._id === id ? { ...t, status: "completed" } : t
      )
    );
  };

  const isOverdue = (dueDate, status) =>
    status !== "completed" && new Date(dueDate) < new Date();

  const filteredTasks = tasks
    .filter((t) =>
      t.tittle.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filterPriority ? t.priority === filterPriority : true
    )
    .filter((t) =>
      filterStatus ? t.status === filterStatus : true
    )
    .filter((t) =>
      filterEmployee ? t.assignedTo === filterEmployee : true
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl mb-4">Task Form</h1>

      <div className="grid gap-2 mb-6">
        <input
          className="border p-2"
          placeholder="Title"
          value={task.tittle}
          onChange={(e) =>
            setTask({ ...task, tittle: e.target.value })
          }
        />

        <input
          className="border p-2"
          placeholder="Description"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />

        <select
          className="border p-2"
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="date"
          className="border p-2"
          value={task.dueDate}
          onChange={(e) =>
            setTask({ ...task, dueDate: e.target.value })
          }
        />

        <select
          className="border p-2"
          value={task.assignedTo}
          onChange={(e) =>
            setTask({ ...task, assignedTo: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.name}>
              {emp.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button onClick={assignTask}>Add</button>
          <button onClick={updateTask} disabled={!editingTask}>
            Update
          </button>
        </div>
      </div>

      <div className="grid gap-2 mb-6">
        <input
          className="border p-2"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          className="border p-2"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="border p-2"
          onChange={(e) => setFilterEmployee(e.target.value)}
        >
          <option value="">Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.name}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((t) => (
          <div key={t._id} className="border p-3">
            <h2>{t.tittle}</h2>
            <p>{t.description}</p>
            <p>{t.status}</p>
            <p>{t.priority}</p>
            <p>
              {t.dueDate}
              {isOverdue(t.dueDate, t.status) && " OVERDUE"}
            </p>
            <p>{t.assignedTo}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => editingTasks(t)}>Edit</button>
              <button onClick={() => deleteTask(t._id)}>Delete</button>
              <button onClick={() => markCompleted(t._id)}>
                Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}