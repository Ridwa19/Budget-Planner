import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    // Update budget if applicable
    const budgetToUpdate = budgets.find(budget => budget.category === newTransaction.category);
    if (budgetToUpdate) {
      const updatedBudget = {
        ...budgetToUpdate,
        spent: budgetToUpdate.spent + (newTransaction.type === 'expense' ? newTransaction.amount : 0),
      };
      editBudget(updatedBudget);
    }
  };

  const editTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const addBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  const editBudget = (updatedBudget) => {
    const updatedBudgets = budgets.map(budget =>
      budget.id === updatedBudget.id ? updatedBudget : budget
    );
    setBudgets(updatedBudgets);
  };

  const deleteBudget = (id) => {
    const updatedBudgets = budgets.filter(budget => budget.id !== id);
    setBudgets(updatedBudgets);
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      editTransaction,
      deleteTransaction,
      budgets,
      addBudget,
      editBudget,
      deleteBudget,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
