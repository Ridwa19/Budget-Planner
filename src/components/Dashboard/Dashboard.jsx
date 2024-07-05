// src/components/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebaseConfig';
import FinancialOverview from './FinancialOverview';
import Charts from './Charts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [budgetSummaries, setBudgetSummaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        // Fetch total income
        const incomeSnapshot = await firestore.collection('transactions')
          .where('type', '==', 'income')
          .get();
        let incomeTotal = 0;
        incomeSnapshot.forEach((doc) => {
          incomeTotal += doc.data().amount;
        });
        setTotalIncome(incomeTotal);

        // Fetch total expenses
        const expensesSnapshot = await firestore.collection('transactions')
          .where('type', '==', 'expense')
          .get();
        let expensesTotal = 0;
        expensesSnapshot.forEach((doc) => {
          expensesTotal += doc.data().amount;
        });
        setTotalExpenses(expensesTotal);

        // Fetch budget summaries
        const budgetsSnapshot = await firestore.collection('budgets')
          .get();
        const budgetsData = [];
        budgetsSnapshot.forEach((doc) => {
          budgetsData.push(doc.data());
        });
        setBudgetSummaries(budgetsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <FinancialOverview totalIncome={totalIncome} totalExpenses={totalExpenses} />
      <Charts budgetSummaries={budgetSummaries} />
    </div>
  );
};

export default Dashboard;
