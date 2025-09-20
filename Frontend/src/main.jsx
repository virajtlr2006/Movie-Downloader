import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </StrictMode>,
)
