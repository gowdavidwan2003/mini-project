import React, { useState, useEffect } from 'react';
import './InteractiveBalls.css'; // Import CSS file for styling
import Header from '../components/Header';

const colors = ['black', 'violet', 'orange', 'blue', 'green', 'yellow', 'red', 'darkblue', 'darkgreen', 'pink', 'brown'];

function shuffleArray(array) {
  const shuffledArray = array.slice(); // Create a shallow copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements randomly
  }
  return shuffledArray;
}

function getRandomPosition(containerWidth, containerHeight) {
  return {
    x: Math.random() * (containerWidth - 50),
    y: Math.random() * (containerHeight - 50)
  };
}

function InteractiveBalls() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [correctColor, setCorrectColor] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledColors, setShuffledColors] = useState(shuffleArray(colors));

  // Select a random color for the game
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setCorrectColor(colors[randomIndex]);
    setShowFeedback(false);
  }, [shuffledColors]);

  // Generate random positions for each ball
  useEffect(() => {
    const containerWidth = document.querySelector('.app').offsetWidth;
    const containerHeight = document.querySelector('.app').offsetHeight;
    const ballElements = document.getElementsByClassName('color-ball');

    for (let i = 0; i < ballElements.length; i++) {
      const randomPosition = getRandomPosition(containerWidth, containerHeight);
      ballElements[i].style.left = `${randomPosition.x}px`;
      ballElements[i].style.top = `${randomPosition.y}px`;
    }
  }, [shuffledColors]);

  const handleBallClick = (color) => {
    setSelectedColor(color);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedColor = event.dataTransfer.getData('color');
    setSelectedColor(droppedColor);
    setShowFeedback(true);
    if (droppedColor === correctColor) {
      // Correct color dropped
      console.log('Correct color dropped:', droppedColor);
      setShuffledColors(shuffleArray(colors)); // Shuffle colors
      window.location.reload(); // Reload the page
    } else {
      // Incorrect color dropped
      console.log('Incorrect color dropped:', droppedColor);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    
    <div className="app">
      <Header /> 
      <h1>Interactive Ball Game</h1>
      <div className="color-balls">
        {shuffledColors.map((color, index) => (
          <div
            key={index}
            className={`color-ball ${selectedColor === color ? color : ''}`}
            style={{ backgroundColor: color }} // Set background color of ball
            draggable
            onDragStart={() => handleBallClick(color)}
          ></div>
        ))}
      </div>
      <div
        className="drop-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {showFeedback && (selectedColor === correctColor ? '✅' : '❌')}
        {correctColor ? `Drag and drop ${correctColor} color ball here` : 'Loading...'}
      </div>
    </div>
  );
}

export default InteractiveBalls;
