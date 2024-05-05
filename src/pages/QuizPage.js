import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import Header from '../components/Header';

function QuizPage() {
  const { studentId, subjectId, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [handQuadrant, setHandQuadrant] = useState(null);
  const [autoSelectTimeout, setAutoSelectTimeout] = useState(null);
  const webcamRef = useRef(null);

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

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      setInterval(() => {
        detectHand(net);
      }, 100);
    };
    runHandpose();
  }, []);

  useEffect(() => {
    if (handQuadrant !== null) {
      // Clear any existing timeout
      if (autoSelectTimeout) {
        clearTimeout(autoSelectTimeout);
      }
      // Set a new timeout
      const timeoutId = setTimeout(() => {
        handleOptionSelect(handQuadrant);
      }, 3000);
      setAutoSelectTimeout(timeoutId);
    }
  }, [handQuadrant]);

  const detectHand = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const hand = await net.estimateHands(video);
      if (hand.length > 0) {
        const palmBase = hand[0].landmarks[0]; // Palm base is the first landmark
        const x = palmBase[0];
        const y = palmBase[1];
        const quadrant = determineQuadrant(x, y, video.width, video.height);
        setHandQuadrant(quadrant);
      }
    }
  };

  const determineQuadrant = (x, y, videoWidth, videoHeight) => {
    const quadrantWidth = videoWidth / 2;
    const quadrantHeight = videoHeight / 2;
    if (x <= quadrantWidth && y <= quadrantHeight) {
      return 1;
    } else if (x > quadrantWidth && y <= quadrantHeight) {
      return 2;
    } else if (x <= quadrantWidth && y > quadrantHeight) {
      return 3;
    } else {
      return 4;
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    console.log(`Selected option: ${option}`);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (questions.length === 0 || currentQuestionIndex >= questions.length) {
      return;
    }

    const correctOptionIndex = {
      'a': 0,
      'b': 1,
      'c': 2,
      'd': 3
    }[questions[currentQuestionIndex].correct_option.toLowerCase()];

    if (selectedOption === correctOptionIndex) {
      setScore(prevScore => prevScore + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setHandQuadrant(null);
    setSelectedOption('');

    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    }
  };

  return (
    <div>
       <Header /> 
      <h2>Quiz Page</h2>
      <div>
        <Webcam
          ref={webcamRef}
          mirrored
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 9,
            width: '100%',
            height: '100%'
          }}
        />
        {quizCompleted ? (
          <div>
            <h3>Quiz Completed!</h3>
            <p>Your Score: {score}</p>
          </div>
        ) : (
          <div>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{questions[currentQuestionIndex]?.question}</p>
            <ul>
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <li key={index}>
                  <button onClick={() => handleOptionSelect(index)}>{option}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
