import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCurrentUser from '../Hooks/useCurrentUser';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavItem from '../components/NavItem';

const Navbar = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.info('You are logged out.');
      navigate('/signin');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="flex justify-between bg-gray-200 p-3 shadow-md mb-3">
      <div className="flex items-center mx-auto">
        <h1 className="text-2xl font-bold">Budget Planner</h1>
      </div>

      <div className="hidden md:flex items-center">
        {currentUser ? (
          <button
            className="border-2 border-gray-500 px-2 rounded-md mr-2 hover:bg-gray-500 hover:text-white shadow-md"
            onClick={logOut}
          >
            Sign Out
          </button>
        ) : (
          <>
            {/* Uncomment to add SignIn and SignUp links */}
            {/* <NavItem to="/signin">Sign In</NavItem>
            <NavItem to="/signup">Sign Up</NavItem> */}
          </>
        )}
      </div>

      {!location.pathname.includes('/signin') && !location.pathname.includes('/signup') && (
        <div className="fixed left">
          <button className="border-2 border-gray-300 bg-gray-200 p-2 rounded-md text-gray-600 hover:border-blue-500 hover:bg-gray-300 transition duration-300" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          {isSidebarOpen && (
            <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-lg p-4">
              <div className="flex justify-end">
                <button className="text-gray-600 hover:text-red-500 transition duration-300" onClick={toggleSidebar}>
                  <Menu size={24} />
                </button>
              </div>
              <nav className="flex flex-col mt-4 space-y-4">
                <NavItem to="/dashboard" onClick={toggleSidebar}>Dashboard</NavItem>
                <NavItem to="/budget-management" onClick={toggleSidebar}>Budget Management</NavItem>
                <NavItem to="/add-budget" onClick={() => { navigate('/add-budget'); toggleSidebar(); }}>Add Budget</NavItem>
                <NavItem to="/add-transaction/:budgetId" onClick={toggleSidebar}>Add Transaction</NavItem>
                <NavItem to="/transactions/:budgetId" onClick={toggleSidebar}>Transactions</NavItem>
                <NavItem to="/profile" onClick={toggleSidebar}>Profile</NavItem>
                <NavItem to="/settings" onClick={toggleSidebar}>Settings</NavItem>
              </nav>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
