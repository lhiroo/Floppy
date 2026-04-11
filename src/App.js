import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from 'react'

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"


const App = () => {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('sb-lfloccrnumfnzezfgitu-auth-token')
    return stored ? JSON.parse(stored) : null
  })

  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Floppy</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Floppy</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken}/>} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/signUp" element={<SignUp token={token} />} />
        <Route path="/create" element={<Create token={token}/>} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass