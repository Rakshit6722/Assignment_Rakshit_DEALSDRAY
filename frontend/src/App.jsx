import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Dashboard from './pages/Dashboard'
import DashHome from './pages/DashHome'
import EmployeeList from './pages/EmployeeList'
import EmployeeCreate from './pages/EmployeeCreate'
import EditEmployee from './pages/EditEmployee'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />}  >
          <Route element={<DashHome />} index />
          <Route path='/dashboard/employeeList' element={<EmployeeList />} />
          <Route path='/dashboard/createEmployee' element={<EmployeeCreate />} />
          <Route path='/dashboard/editEmployee/:id' element={<EditEmployee/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App