import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const ColorShapePage = () => {
  const [color, setColor] = useState('');
  const [shape, setShape] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/colorshape', {
        selectedcolor : color,
        selectedshape : shape
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error submitting the data!', error);
    }
  };

  const isSubmitDisabled = !color || !shape;

  return (
    <div className="bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: "url('/quiz.jpg')" }}>
      <Header />
      <div className="max-w-sm mx-auto mt-20 bg-white bg-opacity-95 rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl mb-4 mt-4 font-semibold ">Select Color and Shape</h1>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="color">Color:</label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-gray-200 rounded-md p-2 mr-2 mb-2 w-48"
            >
              <option value="">Select a color</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              {/* Add more colors as needed */}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="shape">Shape:</label>
            <select
              id="shape"
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="bg-gray-200 rounded-md p-2 mr-2 mb-2 w-48"
            >
              <option value="">Select a shape</option>
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
              {/* Add more shapes as needed */}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`py-2 px-4 rounded-md mr-2 mb-2 w-40 h-12 font-semibold text-lg ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorShapePage;
