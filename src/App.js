import { useState, useEffect } from "react"
import { Routes, Route, Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import Register from "./components/Register"
import Login from "./components/Login"


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />}/> 
        <Route path="/login" element={<Login />} />
        <Route path="/index" />
      </Routes>
    </div>
  );
}

export default App;