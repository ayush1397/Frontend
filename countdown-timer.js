import React, { useState, useEffect, useRef } from 'react';

export default function CountdownTimer() {
  const initialTime = 60; // seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  }, [timeLeft]);

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>⏳ Countdown Timer</h2>
      <div
        style={{
          fontSize: '48px',
          marginBottom: '20px',
          fontWeight: 'bold',
        }}
      >
        {formatTime(timeLeft)}
      </div>

      <button
        onClick={handleStart}
        disabled={isRunning || timeLeft === 0}
        style={{ marginRight: '10px', padding: '10px 20px' }}
      >
        Start
      </button>

      <button onClick={handleReset} style={{ padding: '10px 20px' }}>
        Reset
      </button>
    </div>
  );
}
