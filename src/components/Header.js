import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold"><Link to="/" >QUIZ WIZARDS</Link></h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="relative group ml-2">
              <span className="inline-block cursor-pointer">Navigate</span>
              <ul className="absolute left-0 hidden bg-white text-gray-800 p-2 rounded-md shadow-md group-hover:block">
                <li><Link to="/" className="block px-4 py-2 hover:bg-blue-100">Home</Link></li>
                <li><Link to="/quiz" className="block px-4 py-2 hover:bg-blue-100">Quiz</Link></li>
                <li><Link to="/adminpanel" className="block px-4 py-2 hover:bg-blue-100">Admin Panel</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
