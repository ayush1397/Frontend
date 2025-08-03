import React, { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) return;

    const timer = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 100));
    }, 500); // Increase progress every 500ms

    return () => clearInterval(timer); // Cleanup on unmount
  }, [progress]);

  return (
    <div style={{ padding: '20px', width: '300px' }}>
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
