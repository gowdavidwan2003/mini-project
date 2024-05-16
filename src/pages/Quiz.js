import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Quiz() {
  const [studentId, setStudentId] = useState('');
  const [ studentDetails ,setStudentDetails] = useState(null);
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
      const response = await axios.get(`http://localhost:5000/api/subjects?student_id=${studentId}`);
      setSubjects(response.data);
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
    <div className="bg-cover bg-center bg-fixed min-h-screen" style={{backgroundImage: "url('/quiz.jpg')"}}>
      <Header />
    <div className="container mx-auto flex flex-col items-center py-12 text-black bg-white bg-opacity-95 rounded-lg">
      
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Quiz Wizards!</h2>
      <form onSubmit={handleSubmit} className="text-center text-lg">
        <label htmlFor="studentId" className="block mb-4 text-lg font-semibold">Enter Student ID:</label>
        <input
          type="number"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border rounded-md py-2 px-4 mb-4 text-lg"
        />
        <button type="submit" className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md mb-2 block text-lg font-semibold">
          Fetch
        </button>
        <label htmlFor="subject" className="block mb-2 text-lg font-semibold">Select Subject:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="border rounded-md py-2 px-4 mb-4 text-lg"
        >
          <option value="">Select...</option>
          {subjects.map((subject) => (
            <option key={subject.subject_id} value={subject.subject_id}>
              {subject.subject_name}
            </option>
          ))}
        </select>
        <label htmlFor="levelSelect" className="block mb-2 text-lg font-semibold">Select Level:</label>
        <select
          id="levelSelect"
          value={selectedLevel}
          onChange={handleLevelChange}
          className="border rounded-md py-2 px-4 mb-4 text-lg"
        >
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
        </select>
        <br/>
        
        <button
          type="button"
          onClick={handleProceedToQuiz}
          disabled={!selectedSubject}
          className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md mb-2 block font-semibold">
          Proceed to Quiz
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Quiz;
