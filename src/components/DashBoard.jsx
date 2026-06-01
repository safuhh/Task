import React from 'react'
import { useState } from 'react'
export default function DashBoard() {
    const [employees, setEmployees] = useState([])
    const [tasks, setTasks] = useState([])
  return (
    <div>
        <h1>Employe Dashboard</h1>
    </div>
  )
}
