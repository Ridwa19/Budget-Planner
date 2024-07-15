import React, { useContext, useState, useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const Dashboard = () => {
  // Destructure transactions and budgets from TransactionContext
  const { transactions, budgets } = useContext(TransactionContext);

  // Define state variables for income, expenses, remaining balance, budgeted amount, and spent amount
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [totalBudgeted, setTotalBudgeted] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  // useEffect to calculate totals based on transactions and budgets
  useEffect(() => {
    // Calculate total income
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    
    // Calculate total expenses
    const expenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    // Update state with calculated values
    setTotalIncome(income);
    setTotalExpenses(expenses);
    setRemainingBalance(income - expenses);

    // Calculate total budgeted and total spent
    const budgeted = budgets.reduce((acc, budget) => acc + parseFloat(budget.allocated), 0);
    const spent = budgets.reduce((acc, budget) => acc + parseFloat(budget.spent), 0);

    // Update state with calculated values
    setTotalBudgeted(budgeted);
    setTotalSpent(spent);
  }, [transactions, budgets]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100 px-2 py-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Summary</h3>
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold text-green-600">Total Income:</p>
              <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold text-red-600">Total Expenses:</p>
              <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className={`text-xl font-bold ${remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>Remaining Balance:</p>
              <p className={`text-2xl font-bold ${remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>${remainingBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Summary</h3>
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">Total Budgeted:</p>
              <p className="text-2xl font-bold">${totalBudgeted.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Total Spent:</p>
              <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
