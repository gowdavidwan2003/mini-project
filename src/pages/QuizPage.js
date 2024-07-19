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
      <div className="bg-cover bg-center bg-fixed min-h-screen" style={{backgroundImage: "url('/quiz.jpg')"}}>
      <Header />
    <div className="container mx-auto px-4 py-8 font-semibold bg-white bg-opacity-95">
      {/* <h2 className="text-3xl font-semibold mb-6 text-center">
        <span className="text-3xl font-bold mb-6 text-center">
          Quiz Page
          </span>
          </h2> */}
      
      <div className="flex ml-24">
        <div className="w-full md:w-2/3 lg:w-1/2">
        <span className="text-2xl mb-4 bg-white bg-opacity-100 font-bold">Score: {score}</span>
       <div className="bg-white bg-opacity-100 shadow-md rounded-md p-6">
  {quizCompleted ? (
    <div>
      <h3 className="text-3xl font-bold mb-2">Quiz Completed!</h3>
      <p className="text-2xl mb-4">Your Score: {score}</p>
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="question mb-6 w-3/10">
        {/* <p className="text-lg mb-2">Question {currentQuestionIndex + 1}</p> */}
        <h3 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex]?.question}</h3>
      </div>
      <div className="w-7/10 grid grid-cols-2 grid-rows-2 gap-4">
        {questions[currentQuestionIndex]?.options.map((option, index) => (
          <div key={index} className={`option-wrapper border-2 border-blue-500 p-2 ${index < 2 ? 'row-start-1' : 'row-start-2'} ${index % 2 === 0 ? 'col-start-1' : 'col-start-2'}`}>
            <p className="option-text text-center text-2xl font-extrabold">{option}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


          <button id="openCameraButton"
               onClick={() => handleOptionSelect(0)}
               className={`bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-500 hover:to-purple-400 text-white py-2 px-4 rounded-md mb-2 block text-xl font-semibold" ${selectedOption === 0 ? 'bg-blue-600' : ''}`}
             >Ready
              </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default QuizPage;
