/**
 * index.js - Main entry point for the React application.
 * This file renders the root component of the application and sets up routing using React Router.
 */

 import React from 'react'; // Importing React library
 import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
 import './index.css'; // Importing styles
 import Login from './pages/Login'; // Importing the Login page component
 import Home from './pages/Home'; // Importing the Home page component
 import Ranger from './pages/Ranger'; // Importing the Ranger page component
 import reportWebVitals from './reportWebVitals'; // Importing function to report web vitals
 import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importing BrowserRouter and related components for routing
 
 const root = ReactDOM.createRoot(document.getElementById('root')); // Creating a root element for rendering
 root.render(
   <React.StrictMode>
     <BrowserRouter>
       <Routes>
         {/* Setting up routes for different pages */}
         <Route path='ranger' element={<Ranger/>} /> {/* Route for the Ranger page */}
         <Route path='login' element={<Login/>} /> {/* Route for the Login page */}
         <Route path='' element={<Home/>} /> {/* Default route for the Home page */}
       </Routes>
     </BrowserRouter>
   </React.StrictMode>
 );
 
 // Function to measure performance in the application
 // You can pass a function to log results or send to an analytics endpoint
 // Learn more: https://bit.ly/CRA-vitals
 reportWebVitals();
 