/**
 * index.js - Entry point for the React application, responsible for rendering components and setting up routing.
 */

// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS file for styling
import Login from './pages/Login'; // Import Login component
import Home from './pages/Home'; // Import Home component
import Ranger from './pages/Ranger'; // Import Ranger component
import Register from './pages/Register'; // Import Register component
import Profile from './pages/Profile'; // Import Profile component
import ChangePassword from './pages/ChangePassword'; // Import ChangePassword component
import reportWebVitals from './reportWebVitals'; // Import utility for measuring web vitals
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import React Router components for routing

// Create a root instance for rendering React components
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main application component
root.render(
  <React.StrictMode>
    {/* Wrap the application in StrictMode for enhanced error detection */}
    <BrowserRouter>
      {/* Provide routing functionality using BrowserRouter */}
      <Routes>
        {/* Define route configurations */}
        <Route path='ranger' element={<Ranger/>} /> {/* Render Ranger component for '/ranger' route */}
        <Route path='login' element={<Login/>} /> {/* Render Login component for '/login' route */}
        <Route path='' element={<Home/>} /> {/* Render Home component for default route '/' */}
        <Route path='register' element={<Register />} /> {/* Render Register component for '/register' route */}
        <Route path='profile' element={<Profile />} /> {/* Render Profile component for '/profile' route */}
        <Route path='change-password' element={<ChangePassword />} /> {/* Render ChangePassword component for '/change-password' route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// Measure performance in the application
// To measure performance, pass a function to log results or send them to an analytics endpoint
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
