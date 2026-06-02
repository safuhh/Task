import React, { useEffect, useState } from "react";

export default function EmployeeForm() {
  const [search, setsearch] = useState("");

  const [departments, setDepartments] = useState(["CS", "LLM"]);
  const [newDept, setNewDept] = useState("");
  const [filterDept, setFilterDept] = useState("");

  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : [];
  });

  const [editing, setediting] = useState(false);

  const [form, setform] = useState({
    _id: "",
    name: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addemployee = () => {
    if (!form.email || !form.name) return;

    const exists = employees.some((e) => e.email === form.email);
    if (exists) return alert("Email already exists");

    const newEmployee = {
      ...form,
      _id: Date.now(),
    };

    setEmployees([...employees, newEmployee]);

    setform({
      _id: "",
      name: "",
      department: "",
      email: "",
    });
  };

  const editEmployee = (emp) => {
    setform(emp);
    setediting(true);
  };

  const updateEmployee = () => {
    const updated = employees.map((e) =>
      e._id === form._id ? form : e
    );

    setEmployees(updated);
    setediting(false);
  };

  const deleteemployee = (id) => {
    setEmployees(employees.filter((e) => e._id !== id));
  };

  const addDepartment = () => {
    if (!newDept.trim()) return;

    const exists = departments.some(
      (d) => d.toLowerCase() === newDept.toLowerCase()
    );

    if (exists) return;

    setDepartments([...departments, newDept]);
    setNewDept("");
  };

  const filteredEmployees = employees
    .filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((emp) =>
      filterDept ? emp.department === filterDept : true
    );

  const totalEmployees = employees.length;

  const deptCount = (dept) =>
    employees.filter((e) => e.department === dept).length;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="mb-4 text-xl">Employee Form</h1>

      <div className="mb-4">
        <h3>Total Employees: {totalEmployees}</h3>

        {departments.map((d) => (
          <p key={d}>
            {d}: {deptCount(d)}
          </p>
        ))}
      </div>

      <div className="grid gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="name"
          value={form.name}
          onChange={(e) =>
            setform({ ...form, name: e.target.value })
          }
        />

        <input
          className="border p-2"
          placeholder="email"
          value={form.email}
          onChange={(e) =>
            setform({ ...form, email: e.target.value })
          }
        />

        <select
          className="border p-2"
          value={form.department}
          onChange={(e) =>
            setform({ ...form, department: e.target.value })
          }
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button onClick={addemployee}>Add</button>
          <button onClick={updateEmployee} disabled={!editing}>
            Update
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-2">Add New Department</h3>

        <div className="flex gap-2">
          <input
            className="border p-2"
            placeholder="New Department"
            value={newDept}
            onChange={(e) => setNewDept(e.target.value)}
          />
          <button onClick={addDepartment}>Add</button>
        </div>
      </div>

      <div className="grid gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Search employee"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        <select
          className="border p-2"
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredEmployees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          filteredEmployees.map((emp) => (
            <div key={emp._id} className="border p-3">
              <h2>{emp.name}</h2>
              <p>{emp.department}</p>
              <p>{emp.email}</p>

              <div className="flex gap-2 mt-2">
                <button onClick={() => editEmployee(emp)}>
                  Edit
                </button>
                <button onClick={() => deleteemployee(emp._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}