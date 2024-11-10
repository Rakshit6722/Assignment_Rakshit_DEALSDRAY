import React from 'react'
import { NavLink } from 'react-router-dom'

const DashNavbar = () => {
    const userName = localStorage.getItem('userName')
    const handleLogout = () => {
        localStorage.clear()
    }
  return (
    <div className='flex justify-between lg:justify-center lg:space-x-80 py-2 px-5 bg-blue-200'>
        <NavLink to='/dashboard'>Home</NavLink>
        <NavLink to='/dashboard/employeeList'>Employee List</NavLink>
        <NavLink>{userName}</NavLink>
        <NavLink onClick={handleLogout} to='/'>Logout</NavLink>
    </div>
  )
}

export default DashNavbar