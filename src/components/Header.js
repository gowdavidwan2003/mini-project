// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Quiz Wizards</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* Add additional navigation links here */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
