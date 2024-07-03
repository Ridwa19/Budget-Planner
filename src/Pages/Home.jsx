import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mb-4">Welcome to FinanceFriend</h2>
      <p className="text-center mb-8">Your personal budget planner to keep track of your finances.</p>
      <div className="flex justify-center space-x-4">
        <a href="/signin" className="bg-green-500 text-white px-4 py-2 rounded">Sign In</a>
        <a href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</a>
      </div>
    </div>
  );
}

export default Home;
