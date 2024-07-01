// src/pages/SignIn.jsx
import React from 'react';

const SignIn = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mb-4">Sign In</h2>
      <form className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
