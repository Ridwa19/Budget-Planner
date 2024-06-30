import React from 'react';

const Transactions = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Transactions</h2>
        <form className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Description" className="border border-gray-300 p-2 rounded-md" />
            <input type="number" placeholder="Amount" className="border border-gray-300 p-2 rounded-md" />
            <select className="border border-gray-300 p-2 rounded-md">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input type="date" className="border border-gray-300 p-2 rounded-md" />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md mt-4 transform transition duration-300 hover:scale-105">Add Transaction</button>
        </form>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold mb-2">Transaction List</h3>
          {/* Transaction items will go here */}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
