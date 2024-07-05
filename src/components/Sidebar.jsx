// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <h2 className="text-2xl font-bold p-4">Menu</h2>
            <nav className="flex flex-col p-4">
                <Link to="/dashboard" className="p-2 hover:bg-gray-700 rounded-md">Dashboard</Link>
                <Link to="/budgets" className="p-2 hover:bg-gray-700 rounded-md">Budgets</Link>
                <Link to="/add-budget" className="p-2 hover:bg-gray-700 rounded-md">Add Budget</Link>
                <Link to="/add-transaction/:budgetId" className="p-2 hover:bg-gray-700 rounded-md">Add Transaction</Link>
                <Link to="/transactions/:budgetId" className="p-2 hover:bg-gray-700 rounded-md">Transactions</Link>
                <Link to="/profile" className="p-2 hover:bg-gray-700 rounded-md">Profile</Link>
                <Link to="/settings" className="p-2 hover:bg-gray-700 rounded-md">Settings</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
