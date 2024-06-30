import React from 'react';

const BudgetManagement = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Management</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Category" className="border border-gray-300 p-2 rounded-md" />
            <input type="number" placeholder="Budget Limit" className="border border-gray-300 p-2 rounded-md" />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md mt-4 transform transition duration-300 hover:scale-105">Set Budget</button>
        </form>
      </div>
    </div>
  );
}

export default BudgetManagement;
