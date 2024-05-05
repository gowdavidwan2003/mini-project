import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('1'); // Default level is 1
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      fetchSubjects();
    }
  }, [studentId]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:5000//api/subjects?student_id=${studentId}`);
      setSubjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/${studentId}`);
      setStudentDetails(response.data);
      // Trigger the popup here
      alert(`Student Name: ${response.data.full_name}\nDate of Birth: ${response.data.dob}`);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchStudentDetails();
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleProceedToQuiz = () => {
    navigate(`/quiz/${studentId}/${selectedSubject}/${selectedLevel}`);
  };

  return (
    <div>
       <Header /> 
      <h2>Welcome to Quiz Wizards!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentId">Enter Student ID:</label>
        <input
          type="text"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button type="submit">Fetch</button>
        <label htmlFor="subject">Select Subject:</label>
        <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">Select...</option>
          {subjects.map((subject) => (
            <option key={subject.subject_id} value={subject.subject_id}>
              {subject.subject_name}
            </option>
          ))}
        </select>
        <label htmlFor="levelSelect">Select Level:</label>
        <select id="levelSelect" value={selectedLevel} onChange={handleLevelChange}>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
        </select>
        <button type="button" onClick={handleProceedToQuiz} disabled={!selectedSubject}>
          Proceed to Quiz
        </button>
      </form>
    </div>
  );
}

export default HomePage;
