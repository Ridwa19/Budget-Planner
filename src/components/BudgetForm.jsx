// Import necessary dependencies
import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext'; // Import TransactionContext for state management

// Define ManageBudgets functional component
const ManageBudgets = () => {
  // Access budgets array and CRUD functions from TransactionContext
  const { budgets, deleteBudget, editBudget } = useContext(TransactionContext);

  // State variables for managing edit mode and current editing data
  const [editMode, setEditMode] = useState(false);
  const [editBudgetData, setEditBudgetData] = useState({
    id: '',
    category: '',
    allocated: '',
    spent: 0,
  });

  // Handler function to delete a budget by ID
  const handleDelete = (id) => {
    deleteBudget(id);
  };

  // Handler function to enter edit mode for a budget item
  const handleEdit = (budget) => {
    setEditMode(true);
    setEditBudgetData(budget);
  };

  // Handler function to update input values as user types
  const handleChange = (e) => {
    setEditBudgetData({
      ...editBudgetData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler function to submit edited budget data
  const handleSubmit = (e) => {
    e.preventDefault();
    editBudget(editBudgetData);
    setEditMode(false);
    setEditBudgetData({
      id: '',
      category: '',
      allocated: '',
      spent: 0,
    });
  };

  // Render UI for managing budgets
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Budgets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Map through budgets array to display each budget item */}
        {budgets.map((budget) => (
          <div key={budget.id} className="bg-white rounded-lg shadow-md p-6">
            {/* Conditional rendering based on edit mode */}
            {editMode && editBudgetData.id === budget.id ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-4">
                  {/* Input fields for editing budget data */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={editBudgetData.category}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                      placeholder="Enter category"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="allocated" className="block text-sm font-medium text-gray-700 mb-1">Allocated Amount</label>
                    <input
                      type="number"
                      id="allocated"
                      name="allocated"
                      value={editBudgetData.allocated}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none sm:text-sm"
                      placeholder="Enter allocated amount"
                      required
                    />
                  </div>
                </div>
                {/* Buttons for updating or canceling edit */}
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                {/* Displaying non-editable budget details */}
                <h3 className="text-xl font-semibold">{budget.category}</h3>
                <p className="text-gray-600">Allocated: ${budget.allocated}</p>
                <p className="text-gray-600">Spent: ${budget.spent}</p>
                {/* Buttons for editing or deleting a budget */}
                <div className="mt-4">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="inline-block bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(budget.id)}
                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Export ManageBudgets component as default
export default ManageBudgets;
