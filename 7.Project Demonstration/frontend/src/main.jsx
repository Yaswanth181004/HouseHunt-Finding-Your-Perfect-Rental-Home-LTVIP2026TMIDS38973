import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// REQUIRED GLOBAL STYLES
import './index.css';
import './App.css';

// UI LIBRARIES (THIS WAS MISSING)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);