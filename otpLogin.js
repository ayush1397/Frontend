import React, { useState, useEffect } from 'react';

export default function OTPLogin() {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30);

  // Mock OTP sender
  const sendOTP = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    setGeneratedOtp(newOtp);
    console.log('🔐 OTP sent:', newOtp); // For demo
    setTimer(30);
    setStep(2);
  };

  // Countdown timer
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setMessage('✅ Logged in successfully!');
    } else {
      setMessage('❌ Invalid OTP. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '40px auto', textAlign: 'center' }}>
      <h2>OTP Login</h2>

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); sendOTP(); }}>
          <input
            type="text"
            placeholder="Enter phone or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            required
          />
          <button type="submit" style={{ padding: '10px 20px' }}>Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            style={{ padding: '10px', width: '100%', marginBottom: '10px', textAlign: 'center' }}
            required
          />
          <button type="submit" style={{ padding: '10px 20px' }}>Verify</button>
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
            {timer > 0
              ? `Resend OTP in ${timer}s`
              : <button onClick={sendOTP} type="button">🔁 Resend OTP</button>}
          </div>
        </form>
      )}

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}
