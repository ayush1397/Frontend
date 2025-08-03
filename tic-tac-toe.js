import React, { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board
  const [xIsNext, setXIsNext] = useState(true); // track turn
  const winner = calculateWinner(board); // check if game is over

  function handleClick(index) {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(updatedBoard);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderCell(index) {
    return (
      <button
        onClick={() => handleClick(index)}
        style={{
          width: '60px',
          height: '60px',
          fontSize: '24px',
          fontWeight: 'bold',
          border: '1px solid #333',
          background: '#fff',
          cursor: board[index] || winner ? 'not-allowed' : 'pointer',
        }}
      >
        {board[index]}
      </button>
    );
  }

  const status = winner
    ? `🎉 Winner: ${winner}`
    : board.every(cell => cell !== null)
    ? 'Draw 😐'
    : `Turn: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Tic Tac Toe</h1>
      <h2>{status}</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 60px)',
          gap: '5px',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        {board.map((_, i) => renderCell(i))}
      </div>

      <button onClick={resetGame} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px'
      }}>
        Restart Game
      </button>
    </div>
  );
}

// Helper to check winner
function calculateWinner(cells) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}
