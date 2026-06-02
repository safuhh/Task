# Employee Task Dashboard (React + Vite)

This is a simple Employee Task Management Dashboard built using React and Vite.

## Features

###  Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- List Employees
- Search Employees by name
- Filter Employees by Department
- Add dynamic departments

###  Task Management
- Assign Task to Employee
- Edit Task
- Delete Task
- Mark Task as Completed
- Store data using Local Storage

###  Dashboard Features
- Total Employees count
- Total Tasks count
- Completed Tasks count
- Pending Tasks count
- Overdue Tasks detection (based on due date)
- Task Priority breakdown (High / Medium / Low)
- Progress Bar (Completed tasks percentage)

###  Task Logic
- If task due date is passed and task is not completed → **Overdue**
- Task progress = (Completed Tasks / Total Tasks) × 100

###  Filters & Search
- Search tasks by title
- Filter tasks by:
  - Priority
  - Status
  - Assigned Employee
- All filters work together

## 🛠 Tech Stack
- React
- Vite
- LocalStorage (for persistence)

##  How to Run

```bash
npm install
npm run dev