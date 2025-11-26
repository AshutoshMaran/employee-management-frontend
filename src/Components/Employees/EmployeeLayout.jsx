import React from 'react'
import EmployeeNavbar from './Emp_Navbar'
import { Outlet } from 'react-router-dom'

function EmployeeLayout() {
  return (
    <div>
      <EmployeeNavbar/>
      <Outlet/>
    </div>
  )
}

export default EmployeeLayout
