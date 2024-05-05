// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header-band">
      <h1>QUIZ WIZARDS</h1>
      <nav>
        <ul>
          <li className="dropdown">
            <span className="dropbtn">Navigate</span>
              <Link to="/">Home</Link>
              <Link to="/adminpanel">Admin Panel</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
