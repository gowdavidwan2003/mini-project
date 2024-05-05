// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import AdminPanel from './pages/AdminPanel'
import InteractiveBalls from './pages/InteractiveBalls';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:studentId/:subjectId/:level" element={<QuizPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/InteractiveBalls" element={<InteractiveBalls />} />
      </Routes>
    </Router>
  );
}

export default App;
