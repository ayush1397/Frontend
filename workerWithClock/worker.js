// Simulate heavy calculation
function heavyCalculation(n) {
    let sum = 0;
    for (let i = 0; i < 1e8; i++) {
      sum += Math.sqrt(i % n); // simulate CPU-intensive work
    }
    return sum.toFixed(2);
  }
  
  // Listen to messages from main thread
  onmessage = function (e) {
    const num = e.data;
    const result = heavyCalculation(num);
    postMessage(result);
  };
  