import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // Function to find a budget by category
  const findBudgetByCategory = (category) => budgets.find(budget => budget.category === category);

  // Function to add a new transaction
  const addTransaction = (newTransaction) => {
    try {
      setTransactions([...transactions, newTransaction]);

      // Update associated budget if exists
      const budgetToUpdate = findBudgetByCategory(newTransaction.category);
      if (budgetToUpdate) {
        const updatedBudget = {
          ...budgetToUpdate,
          spent: budgetToUpdate.spent + (newTransaction.type === 'expense' ? newTransaction.amount : 0),
        };
        editBudget(updatedBudget);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      // Handle error as needed (e.g., notify user)
    }
  };

  // Function to edit an existing transaction
  const editTransaction = (updatedTransaction) => {
    try {
      setTransactions(prevTransactions =>
        prevTransactions.map(transaction =>
          transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        )
      );

      // Update associated budget if exists
      const budgetToUpdate = findBudgetByCategory(updatedTransaction.category);
      if (budgetToUpdate) {
        const updatedBudget = {
          ...budgetToUpdate,
          spent: budgetToUpdate.spent + (updatedTransaction.type === 'expense' ? updatedTransaction.amount : 0),
        };
        editBudget(updatedBudget);
      }
    } catch (error) {
      console.error('Error editing transaction:', error);
      // Handle error as needed
    }
  };

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    try {
      setTransactions(prevTransactions =>
        prevTransactions.filter(transaction => transaction.id !== id)
      );

      // Update associated budget if exists
      const transactionToDelete = transactions.find(transaction => transaction.id === id);
      if (transactionToDelete) {
        const budgetToUpdate = findBudgetByCategory(transactionToDelete.category);
        if (budgetToUpdate) {
          const updatedBudget = {
            ...budgetToUpdate,
            spent: budgetToUpdate.spent - (transactionToDelete.type === 'expense' ? transactionToDelete.amount : 0),
          };
          editBudget(updatedBudget);
        }
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      // Handle error as needed
    }
  };

  // Function to add a new budget
  const addBudget = (newBudget) => {
    try {
      setBudgets([...budgets, newBudget]);
    } catch (error) {
      console.error('Error adding budget:', error);
      // Handle error as needed
    }
  };

  // Function to edit an existing budget
  const editBudget = (updatedBudget) => {
    try {
      setBudgets(prevBudgets =>
        prevBudgets.map(budget =>
          budget.id === updatedBudget.id ? updatedBudget : budget
        )
      );
    } catch (error) {
      console.error('Error editing budget:', error);
      // Handle error as needed
    }
  };

  // Function to delete a budget
  const deleteBudget = (id) => {
    try {
      setBudgets(prevBudgets =>
        prevBudgets.filter(budget => budget.id !== id)
      );
    } catch (error) {
      console.error('Error deleting budget:', error);
      // Handle error as needed
    }
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
