import React from 'react'
import EmployeeForm from './components/EmployeeForm'
import TaskForm from './components/TaskForm'
import DashBoard from './components/DashBoard'
import { Route, Routes } from 'react-router-dom'  
export default function App() {
  return (
    <div>
     
        <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/employees" element={<EmployeeForm />} />
        <Route path="/tasks" element={<TaskForm />} />
      </Routes>
    </div>
  )
}
