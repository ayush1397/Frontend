// Update Clock every second
const clockDiv = document.getElementById("clock");
setInterval(() => {
  const now = new Date();
  clockDiv.innerText = now.toLocaleTimeString();
}, 1000);

// Setup Web Worker
const worker = new Worker("worker.js");

const input = document.getElementById("input");
const result = document.getElementById("result");
const calculateBtn = document.getElementById("calculateBtn");

// Send message to worker on button click
calculateBtn.addEventListener("click", () => {
  const value = parseInt(input.value, 10);
  if (!isNaN(value)) {
    result.innerText = "Calculating in worker...";
    worker.postMessage(value);
  }
});

// Receive result from worker
worker.onmessage = function (e) {
  result.innerText = `Result: ${e.data}`;
};
