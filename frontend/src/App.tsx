import { Routes, Route } from "react-router-dom"
import './App.css';
import UserLogin from './pages/Login';
import UserRegister from './pages/Register';
import Landing from "./pages/Landing";
import SessionCard from "./pages/SessionCard";
import CreateSession from "./pages/CreateSession";
import Dashboard from "./pages/Dashboard";
import EditSession from "./pages/EditSession";
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/session/:id" element={<SessionCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreateSession />} />
        <Route path="/dashboard/edit/:id" element={<EditSession />} />
      </Routes>
      
    </div>
  )
}

export default App
