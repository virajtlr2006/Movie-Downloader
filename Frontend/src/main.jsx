import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Usermovies from './Usermovies.jsx';
import Singlemovie from './Singlemovie.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/usermovies" element={<Usermovies />} />
        <Route path="/movie/:id" element={<Singlemovie />} />
      </Routes>
    </Router>
  </StrictMode>,
)
