import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-2xl">$5000</p>
          </div>
          <div className="bg-amber-100 text-amber-700 p-4 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="text-2xl">$2000</p>
          </div>
          <div className="bg-blue-100 text-blue-700 p-4 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold">Remaining Budget</h3>
            <p className="text-2xl">$3000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
