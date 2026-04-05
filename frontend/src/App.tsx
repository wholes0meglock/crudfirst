import { Routes, Route } from "react-router-dom"
import './App.css';
import UserLogin from './pages/Login';
import UserRegister from './pages/Register';
import Landing from "./pages/Landing";
import SessionCard from "./pages/SessionCard";
function App() {

  return (
    <div>
      <h2> Study Tracker </h2>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/session/:id" element={<SessionCard />} />
      </Routes>
      
    </div>
  )
}

export default App
