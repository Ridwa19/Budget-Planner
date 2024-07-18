import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ManageTransactions = () => {
  const { transactions, addTransaction, deleteTransaction, editTransaction } = useContext(TransactionContext);

  const [editTransactionData, setEditTransactionData] = useState({
    id: '',
    category: '',
    amount: '',
    type: 'expense',
    date: new Date(),
    description: ''
  });

  const handleDelete = (id) => {
    deleteTransaction(id);
  };

  const handleEdit = (transaction) => {
    let date = transaction.date;

    // Check if transaction.date is a Firestore Timestamp
    if (date && typeof date.toDate === 'function') {
      date = date.toDate(); // Convert Firestore Timestamp to Date object
    } else if (!(date instanceof Date)) {
      date = new Date(); // Default to current date if not already a Date object
    }

    setEditTransactionData({
      id: transaction.id,
      category: transaction.category || '',
      amount: transaction.amount || '',
      type: transaction.type || 'expense',
      date: date,
      description: transaction.description || ''
    });
  };

  const handleChange = (e) => {
    setEditTransactionData({
      ...editTransactionData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setEditTransactionData({
      ...editTransactionData,
      date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTransaction(editTransactionData);
    setEditTransactionData({
      id: '',
      category: '',
      amount: '',
      type: 'expense',
      date: new Date(),
      description: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Transactions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transactions.map(transaction => (
          <div key={transaction.id} className="bg-white rounded-lg shadow-md p-6">
            {editTransactionData.id === transaction.id ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-4">
                  <div>
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
                  <div>
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
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <DatePicker
                      id="date"
                      name="date"
                      selected={editTransactionData.date}
                      onChange={handleDateChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      dateFormat="yyyy-MM-dd"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={editTransactionData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    onClick={() => setEditTransactionData({
                      id: '',
                      category: '',
                      amount: '',
                      type: 'expense',
                      date: new Date(),
                      description: ''
                    })}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p><strong>Category:</strong> {transaction.category}</p>
                <p><strong>Amount:</strong> {transaction.amount}</p>
                <p><strong>Type:</strong> {transaction.type}</p>
                <p><strong>Date:</strong> {transaction.date instanceof Date ? transaction.date.toISOString().substr(0, 10) : ''}</p>
                {transaction.description && <p><strong>Description:</strong> {transaction.description}</p>}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={() => handleDelete(transaction.id)}
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

export default ManageTransactions;
