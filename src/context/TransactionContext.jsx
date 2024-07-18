import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const budgetCollection = collection(db, 'budgets');
      const budgetSnapshot = await getDocs(budgetCollection);
      const budgetList = budgetSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBudgets(budgetList);
    };

    const fetchTransactions = async () => {
      const transactionCollection = collection(db, 'transactions');
      const transactionSnapshot = await getDocs(transactionCollection);
      const transactionList = transactionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(transactionList);
    };

    fetchBudgets();
    fetchTransactions();
  }, []);

  const addTransaction = async (newTransaction) => {
    try {
      const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
      setTransactions([...transactions, { id: docRef.id, ...newTransaction }]);
      // Update associated budget
      const budgetToUpdate = budgets.find(budget => budget.category === newTransaction.category);
      if (budgetToUpdate) {
        const updatedSpent = budgetToUpdate.spent + newTransaction.amount;
        await updateDoc(doc(db, 'budgets', budgetToUpdate.id), { spent: updatedSpent });
        setBudgets(budgets.map(budget => budget.id === budgetToUpdate.id ? { ...budget, spent: updatedSpent } : budget));
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const editTransaction = async (updatedTransaction) => {
    try {
      await updateDoc(doc(db, 'transactions', updatedTransaction.id), updatedTransaction);
      setTransactions(transactions.map(transaction => transaction.id === updatedTransaction.id ? updatedTransaction : transaction));
    } catch (error) {
      console.error('Error editing transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const addBudget = async (newBudget) => {
    try {
      const docRef = await addDoc(collection(db, 'budgets'), newBudget);
      setBudgets([...budgets, { id: docRef.id, ...newBudget }]);
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const editBudget = async (updatedBudget) => {
    try {
      await updateDoc(doc(db, 'budgets', updatedBudget.id), updatedBudget);
      setBudgets(budgets.map(budget => budget.id === updatedBudget.id ? updatedBudget : budget));
    } catch (error) {
      console.error('Error editing budget:', error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await deleteDoc(doc(db, 'budgets', id));
      setBudgets(budgets.filter(budget => budget.id !== id));
    } catch (error) {
      console.error('Error deleting budget:', error);
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
