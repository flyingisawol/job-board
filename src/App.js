import { useState, useEffect } from "react"
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import Register from "./components/Register"
import Login from "./components/Login"
import UserDashboard from "./components/UserDashboard"
import EmployerDashboard from "./components/EmployerDashboard"
import Header from "./components/Header"
import ShowJob from "./components/ShowJob"
import CreateJob from "./components/ShowJob"

const PrivateRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getLoggedInUser = async () => {
      const res = await fetch("/api/verify/")
      const data = await res.json()
      if (res.status === 200) {
        setUser(data)
      }
    }
    getLoggedInUser()
  }, [])

  return (
    <div className="App">
      <Header user={user} setUser={setUser} /> 
      <Routes>
        <Route path="/register" element={<Register setUser={setUser}/>}/> 
        <Route path="/login" element={<Login setUser={setUser}/>} />
        
        {/* { <Route path="/" element={<PrivateRoutes isLoggedIn={!!user} />}> } */}
          <Route path="/applicant-dashboard" element={<UserDashboard user={user}/>}/>
          <Route path="/employer-dashboard" element={<EmployerDashboard user={user}/>}/>
          <Route path="/job/:id" element={<ShowJob />} />
          <Route path="/job/" element={<CreateJob />} />
      </Routes>
    </div>
  )
}

export default App