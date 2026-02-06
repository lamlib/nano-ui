let worker = null;
let sum = 0;

function createWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  worker = new Worker('worker.js');
  worker.onmessage = (e) => {
    const msg = e.data || {};
    if (msg.type === 'progress') {
      document.getElementById('progress').textContent = `Action ${msg.action + 1}: ${Math.round(msg.progress * 100)}%`;
    } else if (msg.type === 'actionDone') {
      sum += msg.count || 0;
      document.getElementById('checkResult').textContent = sum;
    } else if (msg.type === 'done') {
      document.getElementById('progress').textContent = 'All done';
      document.getElementById('cancelBtn').disabled = true;
      document.getElementById('startBtn').disabled = false;
    } else if (msg.type === 'cancelled') {
      document.getElementById('progress').textContent = 'Cancelled';
      document.getElementById('cancelBtn').disabled = true;
      document.getElementById('startBtn').disabled = false;
    }
  };
  worker.onerror = (err) => {
    console.error('Worker error', err);
    document.getElementById('progress').textContent = 'Worker error';
    document.getElementById('cancelBtn').disabled = true;
    document.getElementById('startBtn').disabled = false;
  };
}

document.addEventListener('DOMContentLoaded', function () {
  createWorker();
  const startBtn = document.getElementById('startBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  startBtn.addEventListener('click', () => {
    sum = 0;
    document.getElementById('checkResult').textContent = '0';
    document.getElementById('progress').textContent = 'Starting...';
    startBtn.disabled = true;
    cancelBtn.disabled = false;
    // iterations per action and number of actions can be tuned
    const iterations = 1e8; // default heavy number, reduce for testing
    worker.postMessage({ cmd: 'start', actions: 5, iterations: iterations });
  });

  cancelBtn.addEventListener('click', () => {
    if (worker) {
      worker.postMessage({ cmd: 'cancel' });
      cancelBtn.disabled = true;
      document.getElementById('progress').textContent = 'Cancelling...';
    }
  });
});