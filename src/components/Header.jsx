// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold animate-pulse">FinanceFriend</h1>
        <nav className="space-x-4">
          <Link to="/dashboard" className="transition-colors duration-300 hover:text-amber-400">Dashboard</Link>
          <Link to="/transactions" className="transition-colors duration-300 hover:text-amber-400">Transactions</Link>
          <Link to="/budget" className="transition-colors duration-300 hover:text-amber-400">Budget</Link>
          <Link to="/reports" className="transition-colors duration-300 hover:text-amber-400">Reports</Link>
          <Link to="/settings" className="transition-colors duration-300 hover:text-amber-400">Settings</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
