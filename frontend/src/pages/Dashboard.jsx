import React from 'react'
import DashNavbar from '../components/common/DashNavbar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <DashNavbar/>
      <Outlet/>
    </div>
  )
}

export default Dashboard