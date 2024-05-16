import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import Header from '../components/Header';

function Home() {
  return (
    <div>
      <div className="bg-cover bg-center bg-fixed min-h-screen" style={{backgroundImage: "url('/quiz.jpg')"}}>
        <Header /> 
        
    <div className="container mx-auto flex flex-col items-center py-12 text-black bg-white bg-opacity-95 rounded-lg">

      <h1 className="text-3xl font-bold mb-4">Welcome to Our Quiz Project</h1>
      <p className="text-xl mb-4">This project aims to provide an interactive quiz platform for learning and testing knowledge.</p>
      <p className="text-2xl mb-4 font-semibold">Features:</p>
      <ul className="list-disc ml-6 mb-4 text-xl">
        <li>Multiple choice questions</li>
        <li>Various difficulty levels</li>
        <li>Subject-specific quizzes</li>
        <li>Score tracking and reporting</li>
      </ul>
      <p className="text-xl mb-4 font-semibold">Get started now by taking a quiz!</p>
      <Link to="/quiz" className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md mb-2 block font-bold">Get Started</Link>
  
      </div>
    </div>
    </div>
    
  );
}

export default Home;
