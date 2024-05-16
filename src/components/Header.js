import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="bg-white bg-opacity-75 text-black py-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex ml-6">
        <img src="/rit_logo.png" alt="Logo" className="h-16 mr-2" />
        </div>
      
        <div className="flex items-center mr-8">
          <Link to="/" className="flex items-center"> 
          <img src="/quizwizards.png" alt="Logo" className="h-16 mr-2" />
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-4">
          <li className="relative group ml-2 mr-6">
          <span className="inline-block cursor-pointer text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-400 hover:text-white transition duration-300">Navigate</span>

  <div className="absolute left-full top-0 hidden bg-white p-2 rounded-md shadow-md group-hover:block">
    {/* Beautiful design beside Navigate */}
    <div className="h-6 w-6 bg-blue-500 rounded-full"></div>
    <div className="h-6 w-6 bg-blue-500 rounded-full ml-2"></div>
    <div className="h-6 w-6 bg-blue-500 rounded-full ml-2"></div>
  </div>
  <ul className="absolute left-0 hidden bg-white text-gray-800 p-2 rounded-md shadow-md group-hover:block">
    <li><Link to="/" className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md mb-2 block font-semibold">Home</Link></li>
    <li><Link to="/quiz" className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md mb-2 block font-semibold">Quiz</Link></li>
    <li><Link to="/adminpanel" className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md block font-semibold">Admin Panel</Link></li>
  </ul>
</li>

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
