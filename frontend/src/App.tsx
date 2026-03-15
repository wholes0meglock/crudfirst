import { Routes, Route } from "react-router-dom"
import './App.css';
import UserLogin from './pages/Login';
import UserRegister from './pages/Register';
function App() {

  return (
    <div>
      Study Tracker
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </div>
  )
}

export default App
