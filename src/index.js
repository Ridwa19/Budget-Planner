import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the '/client' path
import App from './App';
import './index.css'
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
