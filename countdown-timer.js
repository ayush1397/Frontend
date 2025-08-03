import React, { useState, useEffect, useRef } from 'react';

export default function CountdownTimer() {
  const [minutesInput, setMinutesInput] = useState(1); // default 1 min
  const [secondsInput, setSecondsInput] = useState(0);
  const [initialTime, setInitialTime] = useState(60); // in seconds
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
  
    if (timeLeft === 0) {
      setIsRunning(false);
      return;
    }
  
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
  
    return () => clearInterval(timerRef.current); // cleanup function
  }, [isRunning, timeLeft]);

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

  const handleSetTime = () => {
    if (isRunning) return;
    const totalSeconds = minutesInput * 60 + secondsInput;
    setInitialTime(totalSeconds);
    setTimeLeft(totalSeconds);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>⏳ Countdown Timer</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="number"
          value={minutesInput}
          onChange={(e) => setMinutesInput(Number(e.target.value))}
          disabled={isRunning}
          min="0"
          style={{ width: '60px', marginRight: '10px' }}
        />
        min
        <input
          type="number"
          value={secondsInput}
          onChange={(e) => setSecondsInput(Number(e.target.value))}
          disabled={isRunning}
          min="0"
          max="59"
          style={{ width: '60px', marginLeft: '10px', marginRight: '5px' }}
        />
        sec
        <button
          onClick={handleSetTime}
          disabled={isRunning}
          style={{ marginLeft: '10px', padding: '5px 15px' }}
        >
          Set Time
        </button>
      </div>

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
