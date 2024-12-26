import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import './index.css';
import App from './App';

// Create root element for React app rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use render method from createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
