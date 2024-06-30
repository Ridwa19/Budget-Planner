import React, { useState } from 'react';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSave = (e) => {
    e.preventDefault();
    // Logic to save settings
    alert('Settings saved');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="border border-gray-300 p-2 rounded-md" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="border border-gray-300 p-2 rounded-md" 
            />
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)} 
              className="border border-gray-300 p-2 rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-md mt-4 transform transition duration-300 hover:scale-105">Save Settings</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
