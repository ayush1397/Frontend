import React, { useState, useEffect } from 'react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(83.2); // 1 USD = 83.2 INR
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyOptions = ['USD', 'EUR', 'INR', 'GBP'];

  // Simulate fetching exchange rate
  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
    } else {
      // Mock exchange rates (can be replaced with API call)
      const rates = {
        USD: { INR: 83.2, EUR: 0.92, GBP: 0.78 },
        INR: { USD: 0.012, EUR: 0.011, GBP: 0.0094 },
        EUR: { USD: 1.09, INR: 90.5, GBP: 0.85 },
        GBP: { USD: 1.28, INR: 106.3, EUR: 1.18 },
      };

      const rate = rates[fromCurrency]?.[toCurrency] ?? 1;
      setExchangeRate(rate);
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
      <h2>💱 Currency Converter</h2>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ padding: '10px', width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <select
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
          style={{ padding: '10px', width: '48%' }}
        >
          {currencyOptions.map(curr => (
            <option key={curr}>{curr}</option>
          ))}
        </select>

        <select
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
          style={{ padding: '10px', width: '48%' }}
        >
          {currencyOptions.map(curr => (
            <option key={curr}>{curr}</option>
          ))}
        </select>
      </div>

      <div style={{
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        background: '#f0f0f0',
        padding: '12px',
        borderRadius: '6px'
      }}>
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </div>
    </div>
  );
}
