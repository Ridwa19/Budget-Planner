import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const BudgetForm = () => {
  const { addBudget } = useContext(TransactionContext);
  const [budget, setBudgetData] = useState({ category: '', allocated: 0 });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budget, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({ ...budget, allocated: parseFloat(budget.allocated), spent: 0 });
    setBudgetData({ category: '', allocated: 0 });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
        {/* Form title */}
        <h2 className="text-2xl font-bold mb-4 text-center">Set Budget</h2>
        <form onSubmit={handleSubmit}>
          {/* Category input */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={budget.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              placeholder="Enter category"
              required
            />
          </div>
          {/* Allocated amount input */}
          <div className="mb-4">
            <label htmlFor="allocated" className="block text-sm font-medium text-gray-700 mb-1">
              Allocated Amount
            </label>
            <input
              type="number"
              id="allocated"
              name="allocated"
              value={budget.allocated}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              placeholder="Enter allocated amount"
              required
            />
          </div>
          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Set Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
