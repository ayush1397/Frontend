import React, { useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const value = Math.min(Math.max(Number(e.target.value), 0), 100); // Clamp between 0 and 100
    setProgress(value);
  };

  return (
    <div style={{ padding: '20px', width: '300px' }}>
      <input
        type="number"
        value={progress}
        onChange={handleChange}
        min="0"
        max="100"
        style={{
          marginBottom: '12px',
          width: '100%',
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      <div
        style={{
          height: '24px',
          width: '100%',
          backgroundColor: '#e0e0e0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#76c7c0',
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>

      <p style={{ textAlign: 'center', marginTop: '8px' }}>{progress}%</p>
    </div>
  );
}

