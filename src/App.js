// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './pages/Quiz';
import QuizPage from './pages/QuizPage';
import AdminPanel from './pages/AdminPanel'
import InteractiveBalls from './pages/InteractiveBalls';
import HomePage from './pages/HomePage';
import ColorShapePage from './pages/ColorShapePage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:studentId/:subjectId/:level" element={<QuizPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/colorshapepage" element={<ColorShapePage />} />
        <Route path="/InteractiveBalls" element={<InteractiveBalls />} />
      </Routes>
    </Router>
  );
}

export default App;
