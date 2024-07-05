// src/components/Dashboard/FinancialOverview.jsx
import React from 'react';

const FinancialOverview = ({ totalIncome, totalExpenses }) => {
  return (
    <div>
      <h2>Financial Overview</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expenses: ${totalExpenses}</p>
    </div>
  );
};

export default FinancialOverview;
