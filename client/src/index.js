/**
 * index.js - Entry point for the React application, responsible for rendering components and setting up routing.
 */

// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS file for styling
import reportWebVitals from './reportWebVitals'; // Import utility for measuring web vitals
import App from './App';

// Create a root instance for rendering React components
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main application component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance in the application
// To measure performance, pass a function to log results or send them to an analytics endpoint
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
