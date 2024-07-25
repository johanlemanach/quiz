// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Which Dog Are YOU</h1>
      <p>(based on completely random things)</p>
      <nav>
       
            <Link to="/">Home</Link>
         
            <Link to="/quiz">Quiz</Link>
        
      </nav>
    </header>
  );
}

export default Header;
