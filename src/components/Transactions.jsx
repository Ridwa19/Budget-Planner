import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const ManageTransactions = () => {
  const { transactions, deleteTransaction, editTransaction } = useContext(TransactionContext);
  const [editMode, setEditMode] = useState(false);
  const [editTransactionData, setEditTransactionData] = useState({
    id: '',
    category: '',
    amount: '',
    type: 'expense', // Default to expense for example
  });

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const handleEdit = (transaction) => {
    setEditMode(true);
    setEditTransactionData(transaction);
  };

  const handleChange = (e) => {
    setEditTransactionData({
      ...editTransactionData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTransaction(editTransactionData);
    setEditMode(false);
    setEditTransactionData({
      id: '',
      category: '',
      amount: '',
      type: 'expense',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Manage Transactions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transactions.map(transaction => (
          <div key={transaction.id} className="bg-white rounded-lg shadow-md p-6">
            {editMode && editTransactionData.id === transaction.id ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={editTransactionData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={editTransactionData.amount}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800">{transaction.category}</h3>
                <p className="text-xl font-bold text-gray-800">${transaction.amount}</p>
                <div className="mt-2 flex justify-between items-center">
                  <button
                    className="text-sm text-red-600 hover:text-red-700 mr-2"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTransactions;
