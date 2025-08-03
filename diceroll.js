import React, { useState } from 'react';

export default function DiceRoller() {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
  };

  // Optional: Unicode dice characters 🎲
  const diceFaces = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <h2>🎲 Dice Roller</h2>
      <div style={{ fontSize: '80px', margin: '20px' }}>
        {diceFaces[diceValue]}
      </div>
      <h3>You rolled: {diceValue}</h3>
      <button
        onClick={rollDice}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Roll Again
      </button>
    </div>
  );
}
