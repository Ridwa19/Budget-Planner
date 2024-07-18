import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import useFormState from '../Hooks/useFormState'; 

const AddTransactionForm = () => {
  const { addTransaction } = useContext(TransactionContext);
  const { transaction, handleChange, resetTransaction } = useFormState();
  const [customDate, setCustomDate] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate custom date format
    if (!isValidDate(customDate)) {
      setError('Please enter a valid date (MM/DD/YYYY)');
      return;
    }

    // Parse custom date format to Date object
    const parts = customDate.split('/');
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[0], 10) - 1; // Month is zero-indexed
    const day = parseInt(parts[1], 10);
    const date = new Date(year, month, day);

    // Prepare transaction object with parsed date
    const transactionToAdd = {
      ...transaction,
      date: date.toISOString() // Convert date to ISO string for Firebase compatibility
    };

    // Add transaction and handle errors
    addTransaction(transactionToAdd)
      .then(() => {
        resetForm();
        setError('');
      })
      .catch((error) => {
        console.error('Error adding transaction:', error);
        setError('Failed to add transaction. Please try again.');
      });
  };

  // Function to validate custom date format
  const isValidDate = (dateString) => {
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return regex.test(dateString);
  };

  // Function to reset form fields and custom date input
  const resetForm = () => {
    resetTransaction();
    setCustomDate('');
  };

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
          {/* Custom Date Input */}
          <div className="mb-4">
            <label htmlFor="customDate" className="block text-sm font-medium text-gray-700 mb-1">Date (MM/DD/YYYY)</label>
            <input
              type="text"
              id="customDate"
              name="customDate"
              value={customDate}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setError('');
              }}
              className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm ${error ? 'border-red-500' : ''}`}
              placeholder="1/1/2022"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
