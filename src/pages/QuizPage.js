import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import Webcam from 'react-webcam';

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
    // Automatically select option after 3 seconds if hand is on the quadrant
    if (handQuadrant !== null) {
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
        const landmarks = hand[0].landmarks;
        const x = landmarks[0][0];
        const y = landmarks[0][1];
        const quadrant = determineQuadrant(x, y, video.width, video.height);
        setHandQuadrant(quadrant);
      }
    }
  };

  const determineQuadrant = (x, y, videoWidth, videoHeight) => {
    // Determine the quadrant based on the position of the hand
    const quadrantWidth = videoWidth / 2;
    const quadrantHeight = videoHeight / 2;
    if (x < quadrantWidth && y < quadrantHeight) {
      return 1;
    } else if (x >= quadrantWidth && y < quadrantHeight) {
      return 2;
    } else if (x < quadrantWidth && y >= quadrantHeight) {
      return 3;
    } else {
      return 4;
    }
  };

  const handleOptionSelect = (option) => {
    // Clear auto-select timeout
    clearTimeout(autoSelectTimeout);
    // Update selected option
    setSelectedOption(option);
    // Move to next question
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    // Check if questions array is empty or current question index is out of bounds
    if (questions.length === 0 || currentQuestionIndex >= questions.length) {
      return;
    }

    // Map correct_option character to index
    const correctOptionIndex = {
      'a': 0,
      'b': 1,
      'c': 2,
      'd': 3
    }[questions[currentQuestionIndex].correct_option.toLowerCase()];

    // Check if selected option is correct
    if (selectedOption === questions[currentQuestionIndex].options[correctOptionIndex]) {
      // Update score using the functional form of setScore
      setScore(prevScore => prevScore + 1);
    }
    // Print score to console
    console.log('Score:', score);
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setHandQuadrant(null); // Reset hand quadrant
    setSelectedOption('');
    // Check if quiz is completed
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    }
  };

  return (
    <div>
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
            {/* Add logic to submit score to the test table */}
          </div>
        ) : (
          <div>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{questions[currentQuestionIndex]?.question}</p>
            <ul>
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <li key={index}>
                  <button onClick={() => handleOptionSelect(option)}>{option}</button>
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
