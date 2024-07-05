// src/components/Dashboard/Charts.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Charts = ({ budgetSummaries }) => {
  // Example chart data
  const data = {
    labels: budgetSummaries.map((budget) => budget.category),
    datasets: [
      {
        label: 'Budget Limits',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: budgetSummaries.map((budget) => budget.limit),
      },
    ],
  };

  return (
    <div>
      <h2>Charts</h2>
      <Bar data={data} />
    </div>
  );
};

export default Charts;
