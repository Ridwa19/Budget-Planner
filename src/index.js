// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { TransactionProvider } from './context/TransactionContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
