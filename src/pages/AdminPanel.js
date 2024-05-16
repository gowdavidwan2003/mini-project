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
    <div className="bg-cover bg-center bg-fixed min-h-screen" style={{backgroundImage: "url('/quiz.jpg')"}}>
         <Header /> 
      {loggedIn ? (
        <div className="max-w-6xl mx-auto py-8 flex bg-white bg-opacity-95">
        {/* Left part */}
        <div className="w-1/5 flex flex-col justify-center items-center border-r border-gray-900">
          <h1 className="text-3xl text-center font-extrabold mb-8">Welcome Admin!</h1>
          <div className="text-center">
            {/* <h2 className="text-xl mb-4">Options</h2> */}
            <div className="flex flex-wrap justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg" onClick={() => handleOptionClick('SubjectReport')}>Subject Report</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg" onClick={() => handleOptionClick('StudentReport')}>Student Report</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg" onClick={() => handleOptionClick('AddQuestion')}>Add Question</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold" onClick={() => handleOptionClick('DeleteQuestion')}>Delete Question</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg" onClick={() => handleOptionClick('AddStudent')}>Add Student</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg" onClick={() => handleOptionClick('DeleteStudent')}>Delete Student</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg" onClick={() => handleOptionClick('AddClass')}>Add Class</button>
<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg" onClick={() => handleOptionClick('AddSubject')}>Add Subject</button>
<button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md block mx-auto mt-4 w-40 h-12 font-semibold text-lg" onClick={() => setLoggedIn(false)}>Logout</button>

            </div>
          </div>
        </div>
        <div className="w-4/5 px-4">
          {displayOption === 'AddStudent' && (
            <div className="mt-8">
              <h2 className="text-3xl mb-4 font-bold ">Add Student</h2>
              <div className="flex flex-wrap justify-center">
                <div>
                <h2 className="text-xl mb-4 font-semibold ">Student Name</h2>
                <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                <br />
                <br />
                <div>
                <h2 className="text-xl mb-4 font-semibold ">Student ID</h2>
                <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                <br />
                <br />
                <div>
                <h2 className="text-xl mb-4 font-semibold ">Student Class</h2>
                <input type="number" placeholder="Class" value={grade} onChange={(e) => setGrade(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                <br />
                <br />
                <div>
                <h2 className="text-xl mb-4 font-semibold ">Student DoB</h2>
                <input type="date" value={dob} onChange={(e) => setDob(new Date(e.target.value))} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                </div>
                <div className="flex flex-wrap justify-center mt-8" >
                <button onClick={handleAddStudent} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Add Student</button>
              
              </div>
            </div>
          )}
          

          {/* Other options */}
{displayOption === 'DeleteStudent' && (
  <div className="mt-8">
    <h2 className="text-3xl mb-4 font-bold">Delete Student</h2>
    <div className="flex flex-wrap justify-center">
      <div>
    <h2 className="text-xl mb-4 font-semibold ">Student ID</h2>
      <input type="text" placeholder="Student ID" value={deletedStudentId} onChange={(e) => setDeletedStudentId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      <br />
      <br />
      </div>
      <div className="flex flex-wrap justify-center mt-8">
      <button onClick={handleDeleteStudent} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Delete Student</button>
    </div>
  </div>
)}
{displayOption === 'AddQuestion' && (
  <div className="mt-8">
    
    <h2 className="text-3xl mb-4 font-bold">Add Question</h2>
    <div className="flex flex-wrap justify-center">
    <div>
    <h2 className="text-xl mb-4 font-semibold ">Question</h2>
      <input type="text" placeholder="Question Text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      <div>
      <h2 className="text-xl mb-4 font-semibold ">Option A</h2>
      <input type="text" placeholder="Option A" value={option_a} onChange={(e) => setOption_a(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      <div>
      <h2 className="text-xl mb-4 font-semibold ">Option B</h2>
      <input type="text" placeholder="Option B" value={option_b} onChange={(e) => setOption_b(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      <div>
      <h2 className="text-xl mb-4 font-semibold ">Option C</h2>
      <input type="text" placeholder="Option C" value={option_c} onChange={(e) => setOption_c(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      <div>
      <h2 className="text-xl mb-4 mt-4 font-semibold ">Option D</h2>
      <input type="text" placeholder="Option D" value={option_d} onChange={(e) => setOption_d(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      <div>
      <h2 className="text-xl mb-4 mt-4 font-semibold ">Correct Answer</h2>
      <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2 ">
  <option value="">Select Correct Answer</option>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
  <option value="c">Option C</option>
  <option value="d">Option D</option>
</select>
</div>

{/* Level dropdown */}
<div>
      <h2 className="text-xl mb-4 mt-4 font-semibold ">Level</h2>
<select value={level} onChange={(e) => setLevel(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2 w-48">
  <option value="">Select Level</option>
  <option value="1">Level 1</option>
  <option value="2">Level 2</option>
  <option value="3">Level 3</option>
  <option value="4">Level 4</option>
</select>
</div>
<div>
      <h2 className="text-xl mb-4 mt-4 font-semibold ">Subject ID</h2>
      <input type="text" placeholder="Subject ID" value={subject_id} onChange={(e) => setSubject_Id(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      </div>
      <br />
      <br />
      <div className="flex flex-wrap justify-center mt-8">
      <button onClick={handleAddQuestion} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Add Question</button>
    
    </div>
  </div>
)}
{displayOption === 'DeleteQuestion' && (
  <div className="mt-8">
    <h2 className="text-3xl mb-4 font-bold">Delete Question</h2>
    <div className="flex flex-wrap justify-center">
      <div>
    <h2 className="text-xl mb-4 mt-4 font-semibold ">Question ID</h2>
      <input type="text" placeholder="Question ID" value={deletedQuestionId} onChange={(e) => setDeletedQuestionId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      <br />
      <br />
      </div>
      <div className="flex flex-wrap justify-center mt-8">
      <button onClick={handleDeleteQuestion} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Delete Question</button>
    
    </div>
  </div>
)}
{displayOption === 'StudentReport' && (
  <div className="mt-8">
    <h2 className="text-3xl mb-4 font-bold">Student Report</h2>
    <div className="flex flex-wrap justify-center">
      <div>
      <h2 className="text-xl mb-4 mt-4 font-semibold ">Student ID</h2>
      <input type="text" placeholder="Enter Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      </div>
      <div className="flex flex-wrap justify-center mt-8">
      <button onClick={() => {fetchStudentDetails(); fetchStudentReport();}} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Generate Student Report</button>
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
    <h2 className="text-3xl mb-4 font-bold">Subject Report</h2>
    <div className="flex flex-wrap justify-center">
    <div>
      <h2 className="text-xl mb-4 mt-4 font-semibold ">Subject ID</h2>
      <input type="text" placeholder="Enter Subject ID" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
      </div>
      </div>
      <div className="flex flex-wrap justify-center mt-8">
      <button onClick={fetchSubjectReport} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Generate Subject Report</button>
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
              <h2 className="text-3xl mb-4 font-bold">Add Class</h2>
              <div className="flex flex-wrap justify-center">
                <div>
                <h2 className="text-xl mb-4 mt-4 font-semibold ">Class ID</h2>
                <input type="text" placeholder="Class ID" value={classId} onChange={(e) => setClassId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                <div>
                <h2 className="text-xl mb-4 mt-4 font-semibold ">Class Name</h2>
                <input type="text" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                </div>
                <div className="flex flex-wrap justify-center mt-8">
                <button onClick={handleAddClass} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Add Class</button>
              </div>
            </div>
          )}
          {/* Add Subject */}
          {displayOption === 'AddSubject' && (
            <div className="mt-8">
              <h2 className="text-3xl mb-4 font-bold">Add Subject</h2>
              <div className="flex flex-wrap justify-center">
                <div>
                <h2 className="text-xl mb-4 mt-4 font-semibold ">Subject ID</h2>
                <input type="text" placeholder="Subject ID" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                <div>
                <h2 className="text-xl mb-4 mt-4 font-semibold ">Subject Name</h2>
                <input type="text" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                <div>
                <h2 className="text-xl mb-4 mt-4 font-semibold ">Class ID</h2>
                <input type="text" placeholder="Class ID" value={classId} onChange={(e) => setClassId(e.target.value)} className="bg-gray-200 rounded-md p-2 mr-2 mb-2" />
                </div>
                </div>
                <div className="flex flex-wrap justify-center mt-8">
                <button onClick={handleAddSubject} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-2 font-semibold text-lg">Add Subject</button>
              </div>
            </div>
          )}
</div>


        </div>
      ) : (
        <div className="max-w-sm mx-auto mt-20 bg-white bg-opacity-95 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl text-center font-bold mb-4">Admin Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-200 rounded-md p-2 mb-4" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-200 rounded-md p-2 mb-4" />
          <button onClick={handleLogin} className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md mb-2 block font-semibold text-lg">Login</button>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;