import React, { useContext, useState, useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const Dashboard = () => {
  const { transactions, budgets } = useContext(TransactionContext);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [totalBudgeted, setTotalBudgeted] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    const expenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setRemainingBalance(income - expenses);

    const budgeted = budgets.reduce((acc, budget) => acc + parseFloat(budget.allocated), 0);
    const spent = budgets.reduce((acc, budget) => acc + parseFloat(budget.spent), 0);

    setTotalBudgeted(budgeted);
    setTotalSpent(spent);
  }, [transactions, budgets]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Transaction Summary</h3>
          <p className="text-xl font-bold text-green-600">Total Income: ${totalIncome.toFixed(2)}</p>
          <p className="text-xl font-bold text-red-600">Total Expenses: ${totalExpenses.toFixed(2)}</p>
          <p className={`text-xl font-bold ${remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Remaining Balance: ${remainingBalance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Budget Summary</h3>
          <p className="text-xl font-bold">Total Budgeted: ${totalBudgeted.toFixed(2)}</p>
          <p className="text-xl font-bold">Total Spent: ${totalSpent.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
