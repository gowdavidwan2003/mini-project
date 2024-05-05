import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function AdminPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayOption, setDisplayOption] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [grade, setGrade] = useState('');
  const [dob, setDob] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [option_a, setOption_a] = useState('');
  const [option_b, setOption_b] = useState('');
  const [option_c, setOption_c] = useState('');
  const [option_d, setOption_d] = useState('');
  const [level, setLevel] = useState('');
  const [subject_id, setSubject_Id] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [deletedStudentId, setDeletedStudentId] = useState('');
  const [deletedQuestionId, setDeletedQuestionId] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleOptionClick = (option) => {
    setDisplayOption(option);
  };

  const handleAddStudent = () => {
    axios.post('http://localhost:5000/api/add_student', {
      full_name: studentName,
      student_id: studentId,
      class_id: grade,
      dob: dob
    })
    .then(response => {
      console.log(response.data);
      alert('Student added successfully');
      setStudentName('');
      setStudentId('');
      setGrade('');
      setDob('');
    })
    .catch(error => {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    });
  };

  const handleDeleteStudent = () => {
    axios.delete(`http://localhost:5000/api/delete_student/${deletedStudentId}`)
    .then(response => {
      console.log(response.data);
      alert(`Student with ID ${deletedStudentId} deleted successfully`);
      setDeletedStudentId('');
    })
    .catch(error => {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    });
  };

  const handleAddQuestion = () => {
    axios.post('http://localhost:5000/api/add_question', {
      question: questionText,
      option_a: option_a,
      option_b: option_b,
      option_c: option_c,
      option_d: option_d,
      correct_answer: correctAnswer,
      level : level,
      subject_id : subject_id

    })
    .then(response => {
      console.log(response.data);
      alert('Question added successfully');
      setQuestionText('');
      setOption_a('');
      setOption_b('');
      setOption_c('');
      setOption_d('');
      setCorrectAnswer('');
      setLevel('');
      setSubject_Id('')
    })
    .catch(error => {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    });
  };

  const handleDeleteQuestion = () => {
    axios.delete(`http://localhost:5000/api/delete_question/${deletedQuestionId}`)
    .then(response => {
      console.log(response.data);
      alert(`Question with ID ${deletedQuestionId} deleted successfully`);
      setDeletedQuestionId('');
    })
    .catch(error => {
      console.error('Error deleting question:', error);
      alert('Failed to delete question. Please try again.');
    });
  };

  return (
    <div>
         <Header /> 
      {loggedIn ? (
        <div>
          <h1>Welcome Admin!</h1>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
          <div>
            <h2>Options</h2>
            <button onClick={() => handleOptionClick('AddStudent')}>Add Student</button>
            <button onClick={() => handleOptionClick('DeleteStudent')}>Delete Student</button>
            <button onClick={() => handleOptionClick('AddQuestion')}>Add Question</button>
            <button onClick={() => handleOptionClick('DeleteQuestion')}>Delete Question</button>
          </div>
          {displayOption === 'AddStudent' && (
            <div>
              <h2>Add Student</h2>
              <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
              <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
              <input type="text" placeholder="class" value={grade} onChange={(e) => setGrade(e.target.value)} />
              <input type="date" value={dob} onChange={(e) => setDob(new Date(e.target.value))} />
              <button onClick={handleAddStudent}>Add Student</button>
            </div>
          )}
          {displayOption === 'DeleteStudent' && (
            <div>
              <h2>Delete Student</h2>
              <input type="text" placeholder="Student ID" value={deletedStudentId} onChange={(e) => setDeletedStudentId(e.target.value)} />
              <button onClick={handleDeleteStudent}>Delete Student</button>
            </div>
          )}
          {displayOption === 'AddQuestion' && (
            <div>
              <h2>Add Question</h2>
              <input type="text" placeholder="Question Text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
              <input type="text" placeholder="Option A" value={option_a} onChange={(e) => setOption_a(e.target.value)} />
              <input type="text" placeholder="Option B" value={option_b} onChange={(e) => setOption_b(e.target.value)} />
              <input type="text" placeholder="Option C" value={option_c} onChange={(e) => setOption_c(e.target.value)} />
              <input type="text" placeholder="Option D" value={option_d} onChange={(e) => setOption_d(e.target.value)} />
              <input type="text" placeholder="Correct Answer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
              <input type="text" placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} />
              <input type="text" placeholder="Subject ID" value={subject_id} onChange={(e) => setSubject_Id(e.target.value)} />
              <button onClick={handleAddQuestion}>Add Question</button>
            </div>
          )}
          {displayOption === 'DeleteQuestion' && (
            <div>
              <h2>Delete Question</h2>
              <input type="text" placeholder="Question ID" value={deletedQuestionId} onChange={(e) => setDeletedQuestionId(e.target.value)} />
              <button onClick={handleDeleteQuestion}>Delete Question</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Admin Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
