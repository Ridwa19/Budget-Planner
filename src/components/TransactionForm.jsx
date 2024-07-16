import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import useFormState from '../Hooks/useFormState'; 

const AddTransactionForm = () => {
  const { addTransaction } = useContext(TransactionContext);
  const { transaction, handleChange, resetTransaction } = useFormState();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(transaction); // Call addTransaction function from context
    resetTransaction(); // Reset form fields
  };

  // Ensure transaction.date is properly initialized as a Date object
  if (!(transaction.date instanceof Date)) {
    transaction.date = new Date(); // Initialize with current date if not already a Date object
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Transaction</h2>
        <form onSubmit={handleSubmit}>
          {/* Transaction Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              id="type"
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          {/* Transaction Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              required
            />
          </div>
          {/* Transaction Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={transaction.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              required
            />
          </div>
          {/* Transaction Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={transaction.date.toISOString().substr(0, 10)} // Ensure transaction.date is a Date object
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              required
            />
          </div>
          {/* Transaction Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              rows="3"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionForm;
