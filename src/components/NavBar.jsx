import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>

<ul>
  <li><Link to="/employees">Employees</Link></li>
  <li><Link to="/tasks">Tasks</Link></li>
</ul>
    </div>
  )
}