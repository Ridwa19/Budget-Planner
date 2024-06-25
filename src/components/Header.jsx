import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">FinanceFriend</h1>
        <nav className="ml-6 space-x-4">
          <Link className="hover:underline" to="/dashboard">Dashboard</Link>
          <Link className="hover:underline" to="/transactions">Transactions</Link>
          <Link className="hover:underline" to="/budget-management">Budget Management</Link>
          <Link className="hover:underline" to="/reports">Reports</Link>
          <Link className="hover:underline" to="/settings">Settings</Link>
        </nav>
      </div>
      <div className="relative">
        <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">User Profile</button>
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg hidden">
          <Link className="block px-4 py-2 hover:bg-gray-200" to="/settings">Settings</Link>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
