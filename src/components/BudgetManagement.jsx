import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TransactionContext } from '../context/TransactionContext';

const AddBudgetForm = () => {
  const { addBudget } = useContext(TransactionContext);
  const [budget, setBudget] = useState({
    id: '',
    category: '',
    allocated: '',
    spent: 0,
  });

  const handleChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudget = { ...budget, id: uuidv4() };
    addBudget(newBudget);
    setBudget({
      id: '',
      category: '',
      allocated: '',
      spent: 0,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Budget</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={budget.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="allocated" className="block text-sm font-medium text-gray-700 mb-1">Allocated Amount</label>
            <input
              type="number"
              id="allocated"
              name="allocated"
              value={budget.allocated}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Budget
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetForm;
