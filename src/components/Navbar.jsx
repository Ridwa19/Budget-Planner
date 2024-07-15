import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCurrentUser from '../Hooks/useCurrentUser';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavItem from '../components/NavItem';

const Navbar = () => {
  // Get the current user information from custom hook
  const currentUser = useCurrentUser();
  
  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to manage the sidebar open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Ref to keep track of the sidebar DOM element
  const sidebarRef = useRef(null);

  // Function to handle user logout
  const logOut = async () => {
    try {
      await signOut(auth);
      toast.info('You are logged out.'); // Show logout notification
      navigate('/signin'); // Navigate to sign-in page
    } catch (error) {
      toast.error(error.message); // Show error message if logout fails
    }
  };

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle clicks outside the sidebar
  const handleClickOutside = (event) => {
    // Check if the clicked element is outside the sidebar
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false); // Close the sidebar
    }
  };

  // Effect to add/remove event listener for detecting clicks outside the sidebar
  useEffect(() => {
    if (isSidebarOpen) {
      // Add event listener when sidebar is open
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove event listener when sidebar is closed
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gray-200 p-3 shadow-md mb-3">
      {/* Navbar title */}
      <div className="flex items-center mx-auto">
        <h1 className="text-2xl font-bold">Budget Planner</h1>
      </div>

      {/* Right side of the navbar for larger screens */}
      <div className="hidden md:flex items-center">
        {currentUser ? (
          // Sign out button for logged-in users
          <button
            className="border-2 border-gray-500 px-2 rounded-md mr-2 hover:bg-gray-500 hover:text-white shadow-md"
            onClick={logOut}
          >
            Sign Out
          </button>
        ) : (
          // Sign in and Sign up links for non-logged-in users (uncomment to use)
          <>
            {/* <NavItem to="/signin">Sign In</NavItem>
            <NavItem to="/signup">Sign Up</NavItem> */}
          </>
        )}
      </div>

      {/* Sidebar toggle button, hidden on sign-in and sign-up pages */}
      {!location.pathname.includes('/signin') && !location.pathname.includes('/signup') && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {/* Button to toggle the sidebar */}
          <button className="border-2 border-gray-300 bg-gray-200 p-2 rounded-md text-gray-600 hover:border-blue-500 hover:bg-gray-300 transition duration-300" onClick={toggleSidebar}>
            <Menu size={24} /> {/* Menu icon */}
          </button>
        </div>
      )}

      {/* Sidebar content */}
      {isSidebarOpen && (
        <div ref={sidebarRef} className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-lg p-4 z-50">
          {/* Close button for sidebar */}
          <div className="flex justify-end">
            <button className="text-gray-600 hover:text-red-500 transition duration-300" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
          </div>
          {/* Sidebar navigation links */}
          <nav className="flex flex-col mt-4 space-y-4">
            <NavItem to="/dashboard" onClick={toggleSidebar}>Dashboard</NavItem>
            <NavItem to="/budget-management" onClick={toggleSidebar}>Add Budget</NavItem>
            <NavItem to="/add-budget" onClick={() => { navigate('/add-budget'); toggleSidebar(); }}>Manage Budgets</NavItem>
            <NavItem to="/add-transaction/:budgetId" onClick={toggleSidebar}>Add Transaction</NavItem>
            <NavItem to="/transactions/:budgetId" onClick={toggleSidebar}>ManageTransactions</NavItem>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
