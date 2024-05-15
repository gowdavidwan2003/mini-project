import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function QuizPage() {
  const { studentId, subjectId, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions?subject_id=${subjectId}&level=${level}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    if (subjectId) {
      fetchQuestions();
    }
  }, [subjectId, level]);

  // useEffect(() => {
  //   // Automatically click the "Open Camera" button when a new question is displayed
  //   const button = document.getElementById('openCameraButton');
  //   if (button) {
  //     button.click();
  //   }
  // }, [currentQuestionIndex]);

  const handleOptionSelect = async (optionIndex) => {
    const response = await axios.post('http://localhost:5000/api/select_option', {
        option_index: optionIndex
      });
    console.log(response.data.option_index)
    // setSelectedOption(optionIndex);
    optionIndex = response.data.option_index
    setSelectedOption(response.data.option_index);
    const correctOption = questions[currentQuestionIndex].correct_option;
    if (correctOption === String.fromCharCode(97 + optionIndex)) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption('');
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    }
  };

  const submitTest = async () => {
    try {
      await axios.post('http://localhost:5000/api/add_score', {
        student_id: studentId,
        subject_id: subjectId,
        score: score
      });
      console.log('Test submitted successfully');
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  useEffect(() => {
    if (quizCompleted) {
      submitTest();
    }
  }, [quizCompleted]);

  useEffect(() => {
  // Automatically click the "Open Camera" button when a new question is displayed
  if (currentQuestionIndex < questions.length) {
    const button = document.getElementById('openCameraButton');
    if (button) {
      button.click();
    }
  }
}, [currentQuestionIndex]);


  return (
    <div>
      <Header />
    <div className="container mx-auto px-4 py-8">
      
      <h2 className="text-3xl font-semibold mb-6 text-center">Quiz Page</h2>
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
        <p className="text-lg mb-4">Score: {score}</p>
          <div className="bg-white shadow-md rounded-md p-6">
            <div>
              
            </div>
            {quizCompleted ? (
              <div>
                <h3 className="text-xl font-semibold mb-2">Quiz Completed!</h3>
                <p className="text-lg mb-4">Your Score: {score}</p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">Question {currentQuestionIndex + 1}</h3>
                <p className="text-lg mb-4">{questions[currentQuestionIndex]?.question}</p>
                <ul className="mb-4">
                  {questions[currentQuestionIndex]?.options.map((option, index) => (
                    <li key={index}>
                     
                     Option {String.fromCharCode(65 + index)}.   {option}

                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button id="openCameraButton"
               onClick={() => handleOptionSelect(0)}
               className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${selectedOption === 0 ? 'bg-blue-600' : ''}`}
             >Open Camera
              </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default QuizPage;
