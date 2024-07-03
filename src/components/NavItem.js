import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NavItem = ({ itemText, itemPath }) => {
   const location = useLocation()
   const isActive = location.pathname === itemPath;
  return (
    <NavLink to={itemPath}>
      <li
        className={`mx-2 ${
          isActive ? "bg-black text-white" : "bg-gray-300"
        }  px-2 hover:bg-gray-400 cursor-pointer rounded-md`}
      >
        {itemText}
      </li>
    </NavLink>
  );
}

export default NavItem