import React from 'react';

const HangmanPage = () => {
  return (
    <div>
      <h1>Hangman Game</h1>
      <p>Welcome to the Hangman Game!</p>

      <svg width='300' height='300' viewBox='0 0 200 220'>
        {/* Gallows */}
        <line x1='40' y1='20' x2='142' y2='20' stroke='#38A169' strokeWidth='4' />
        <line x1='140' y1='20' x2='140' y2='50' stroke='#38A169' strokeWidth='4' />
        <line x1='40' y1='18' x2='40' y2='210' stroke='#38A169' strokeWidth='4' />
        <line x1='0' y1='210' x2='80' y2='210' stroke='#38A169' strokeWidth='4' />

        {/* Head */}
        <circle cx='140' cy='70' r='20' stroke='#38A169' strokeWidth='4' fill='none' />

        {/* Body */}
        <line x1='140' y1='90' x2='140' y2='150' stroke='#38A169' strokeWidth='4' />

        {/* Arms */}
        <line x1='170' y1='120' x2='110' y2='120' stroke='#38A169' strokeWidth='4' />

        {/* Legs */}
        <line x1='140' y1='150' x2='120' y2='180' stroke='#38A169' strokeWidth='4' />
        <line x1='140' y1='150' x2='160' y2='180' stroke='#38A169' strokeWidth='4' />
      </svg>
    </div>
  );
};

export default HangmanPage;