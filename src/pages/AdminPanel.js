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
  const [studentReport, setStudentReport] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [subjectId, setSubjectId] = useState('');
  const [subjectReport, setSubjectReport] = useState(null);
  const [classId, setClassId] = useState('');
  const [className, setClassName] = useState('');
  const [subjectName, setSubjectName] = useState('');

 

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
      setDisplayOption('SubjectReport');
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

  const fetchStudentReport = () => {
    axios.get(`http://localhost:5000/api/student_report/${studentId}`)
      .then(response => {
        setStudentReport(response.data);
      })
      .catch(error => {
        console.error('Error fetching student report:', error);
        alert('Failed to fetch student report. Please try again.');
      });
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/${studentId}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };
  
  const fetchSubjectReport = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/subject_report/${subjectId}`);
      setSubjectReport(response.data);
    } catch (error) {
      console.error('Error fetching subject report:', error);
    }
  };

  const handleAddClass = () => {
    axios.post('http://localhost:5000/api/add_class', {
      class_id: classId,
      class_name: className
    })
    .then(response => {
      console.log(response.data);
      alert('Class added successfully');
      setClassId('');
      setClassName('');
    })
    .catch(error => {
      console.error('Error adding class:', error);
      alert('Failed to add class. Please try again.');
    });
  };

  const handleAddSubject = () => {
    axios.post('http://localhost:5000/api/add_subject', {
      subject_id: subjectId,
      subject_name: subjectName,
      class_id: classId
    })
    .then(response => {
      console.log(response.data);
      alert('Subject added successfully');
      setSubjectId('');
      setSubjectName('');
      setClassId('');
    })
    .catch(error => {
      console.error('Error adding subject:', error);
      alert('Failed to add subject. Please try again.');
    });
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
         <Header /> 
      {loggedIn ? (
        <div className="max-w-4xl mx-auto py-8 flex">
        {/* Left part */}
        <div className="w-1/5 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center font-semibold mb-8">Welcome Admin!</h1>
          <div className="text-center">
            {/* <h2 className="text-xl mb-4">Options</h2> */}
            <div className="flex flex-wrap justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('SubjectReport')}>Subject Report</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('StudentReport')}>Student Report</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('AddQuestion')}>Add Question</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('DeleteQuestion')}>Delete Question</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('AddStudent')}>Add Student</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('DeleteStudent')}>Delete Student</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('AddClass')}>Add Class</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2" onClick={() => handleOptionClick('AddSubject')}>Add Subject</button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md block mx-auto mt-4" onClick={() => setLoggedIn(false)}>Logout</button>
            </div>
          </div>
        </div>
        <div className="w-4/5 px-4">
          {displayOption === 'AddStudent' && (
            <div className="mt-8">
              <h2 className="text-xl mb-4">Add Student</h2>
              <div className="flex flex-wrap justify-center">
                <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <input type="number" placeholder="Class" value={grade} onChange={(e) => setGrade(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <input type="date" value={dob} onChange={(e) => setDob(new Date(e.target.value))} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <button onClick={handleAddStudent} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2">Add Student</button>
              </div>
            </div>
          )}
          

          {/* Other options */}
{displayOption === 'DeleteStudent' && (
  <div className="mt-8">
    <h2 className="text-xl mb-4">Delete Student</h2>
    <div className="flex flex-wrap justify-center">
      <input type="text" placeholder="Student ID" value={deletedStudentId} onChange={(e) => setDeletedStudentId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <button onClick={handleDeleteStudent} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-2">Delete Student</button>
    </div>
  </div>
)}
{displayOption === 'AddQuestion' && (
  <div className="mt-8">
    <h2 className="text-xl mb-4">Add Question</h2>
    <div className="flex flex-wrap justify-center">
      <input type="text" placeholder="Question Text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <input type="text" placeholder="Option A" value={option_a} onChange={(e) => setOption_a(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <input type="text" placeholder="Option B" value={option_b} onChange={(e) => setOption_b(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <input type="text" placeholder="Option C" value={option_c} onChange={(e) => setOption_c(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <input type="text" placeholder="Option D" value={option_d} onChange={(e) => setOption_d(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2">
  <option value="">Select Correct Answer</option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
  <option value="d">D</option>
</select>

{/* Level dropdown */}
<select value={level} onChange={(e) => setLevel(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2">
  <option value="">Select Level</option>
  <option value="1">Level 1</option>
  <option value="2">Level 2</option>
  <option value="3">Level 3</option>
  <option value="4">Level 4</option>
</select>
      <input type="text" placeholder="Subject ID" value={subject_id} onChange={(e) => setSubject_Id(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <button onClick={handleAddQuestion} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2">Add Question</button>
    </div>
  </div>
)}
{displayOption === 'DeleteQuestion' && (
  <div className="mt-8">
    <h2 className="text-xl mb-4">Delete Question</h2>
    <div className="flex flex-wrap justify-center">
      <input type="text" placeholder="Question ID" value={deletedQuestionId} onChange={(e) => setDeletedQuestionId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <button onClick={handleDeleteQuestion} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-2">Delete Question</button>
    </div>
  </div>
)}
{displayOption === 'StudentReport' && (
  <div className="mt-8">
    <h2 className="text-xl mb-4">Student Report</h2>
    <div className="flex flex-wrap justify-center">
      <input type="text" placeholder="Enter Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <button onClick={() => {fetchStudentDetails(); fetchStudentReport();}} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-2">Generate Student Report</button>
    </div>
    {studentReport && (
      <div className="text-center">
        <h3 className="text-lg mb-2">Student Information</h3>
        <p>Student Name: {studentDetails.full_name}</p>
        <p>Date of Birth: {studentDetails.dob}</p>
        <h3 className="text-lg mt-4 mb-2">Test Results</h3>
        {Array.isArray(studentReport) && studentReport.length > 0 ? (
          <ul>
            {studentReport.map((result, index) => (
              <li key={index} className="mb-2">
                <p>Subject : {result.subject_id}</p>
                <p>Score: {result.score}</p>
                <p>Date: {result.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No test results available for this student.</p>
        )}
      </div>
    )}
  </div>
)}
{displayOption === 'SubjectReport' && (
  <div className="mt-8">
    <h2 className="text-xl mb-4">Subject Report</h2>
    <div className="flex flex-wrap justify-center">
      <input type="text" placeholder="Enter Subject ID" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      <button onClick={fetchSubjectReport} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-2">Generate Subject Report</button>
    </div>
    {subjectReport && (
      <div className="text-center">
        <h3 className="text-lg mb-2">Subject Information</h3>
        <p>Subject ID: {subjectReport.subject_id}</p>
        <p>Maximum Score: {subjectReport.max_score}</p>
        <p>Minimum Score: {subjectReport.min_score}</p>
        <p>Average Score: {subjectReport.avg_score}</p>
        <p>Median Score: {subjectReport.median_score}</p>
        <p>Number of Attempts: {subjectReport.num_students}</p>
      </div>
    )}
  </div>
)}
{displayOption === 'AddClass' && (
            <div className="mt-8">
              <h2 className="text-xl mb-4">Add Class</h2>
              <div className="flex flex-wrap justify-center">
                <input type="text" placeholder="Class ID" value={classId} onChange={(e) => setClassId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <input type="text" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <button onClick={handleAddClass} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2">Add Class</button>
              </div>
            </div>
          )}
          {/* Add Subject */}
          {displayOption === 'AddSubject' && (
            <div className="mt-8">
              <h2 className="text-xl mb-4">Add Subject</h2>
              <div className="flex flex-wrap justify-center">
                <input type="text" placeholder="Subject ID" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <input type="text" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <input type="text" placeholder="Class ID" value={classId} onChange={(e) => setClassId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                <button onClick={handleAddSubject} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2">Add Subject</button>
              </div>
            </div>
          )}
</div>


        </div>
      ) : (
        <div className="max-w-sm mx-auto mt-20 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl text-center font-semibold mb-4">Admin Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-200 rounded-md p-2 mb-4" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-200 rounded-md p-2 mb-4" />
          <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Login</button>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
