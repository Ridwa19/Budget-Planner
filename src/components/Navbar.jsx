import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../Hooks/useCurrentUser';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Navbar = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.info('You are logged out🙄');
      navigate('/signin');
    } catch (error) {
      toast.error(error.message);
    }
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
        ) : null}
      </div>

      <div className="w-full flex md:hidden justify-end mr-3">
        <Menu size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
