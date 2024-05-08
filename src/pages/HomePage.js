import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import Header from '../components/Header';

function Home() {
  return (
    <div>
        <Header /> 
    <div className="container mx-auto flex flex-col items-center ">

      <h1 className="text-3xl font-semibold mb-4">Welcome to Our Quiz Project</h1>
      <p className="text-lg mb-4">This project aims to provide an interactive quiz platform for learning and testing knowledge.</p>
      <p className="text-lg mb-4">Features:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Multiple choice questions</li>
        <li>Various difficulty levels</li>
        <li>Subject-specific quizzes</li>
        <li>Score tracking and reporting</li>
      </ul>
      <p className="text-lg mb-4">Get started now by taking a quiz!</p>
      <Link to="/quiz" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Get Started</Link>  
      </div>
    </div>
    
  );
}

export default Home;
