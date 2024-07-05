import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`p-2 rounded-md hover:bg-gray-300 transition duration-300 ${
        isActive ? 'bg-gray-300 font-bold' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default NavItem;
