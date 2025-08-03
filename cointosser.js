import React, { useState } from 'react';

export default function CoinTosser() {
  const [result, setResult] = useState(null);

  const tossCoin = () => {
    const outcomes = ['Heads', 'Tails'];
    const toss = outcomes[Math.floor(Math.random() * 2)];
    setResult(toss);
  };

  const emoji = {
    Heads: '🙂', // Or use 🪙 if preferred
    Tails: '🧠',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <h2>🪙 Coin Tosser</h2>

      {result && (
        <>
          <div style={{ fontSize: '80px', margin: '20px' }}>{emoji[result]}</div>
          <h3>It's {result}!</h3>
        </>
      )}

      <button
        onClick={tossCoin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Toss Coin
      </button>
    </div>
  );
}
