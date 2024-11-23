import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'
import SignUp from './pages/SignUp'
import CreateEmp from './pages/CreateEmp'
import Dashboard from './pages/Dashboard'
import EmpList from './pages/EmpList'
import EditEmp from './pages/EditEmp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     <NavBar />
    <Routes>
      <Route path='/'element={<Home />}/>
      <Route path='/signup'element={<SignUp />}/>
      <Route path='/create'element={<CreateEmp />}/>
      <Route path='/dashboard'element={<Dashboard />}/>
      <Route path='/emp_list'element={<EmpList />}/>
      <Route path="/emp_edit/:id" element={<EditEmp />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
