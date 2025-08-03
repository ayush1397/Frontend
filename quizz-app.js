import React, { useState } from 'react';

// Displays one question at a time

// Multiple choice answers

// Tracks user score

// Show final result at the end

// Reset quiz button

export default function QuizApp() {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      answer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
      answer: 'Mars',
    },
    {
      question: 'Who wrote "Hamlet"?',
      options: ['Leo Tolstoy', 'Mark Twain', 'Shakespeare', 'Homer'],
      answer: 'Shakespeare',
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', textAlign: 'center' }}>
      <h2>🧠 React Quiz App</h2>

      {!showResult ? (
        <>
          <h3>Q{currentQ + 1}: {questions[currentQ].question}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {questions[currentQ].options.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => handleOptionClick(opt)}
                  style={{
                    margin: '6px',
                    padding: '10px 20px',
                    width: '100%',
                    background: selected === opt ? '#007bff' : '#eee',
                    color: selected === opt ? '#fff' : '#000',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleNext}
            disabled={selected === null}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: selected ? 'pointer' : 'not-allowed',
            }}
          >
            {currentQ + 1 === questions.length ? 'Finish' : 'Next'}
          </button>
        </>
      ) : (
        <>
          <h3>🎉 You scored {score} / {questions.length}</h3>
          <button
            onClick={handleRestart}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#17a2b8',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Restart Quiz
          </button>
        </>
      )}
    </div>
  );
}
