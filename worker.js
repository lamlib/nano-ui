// Web Worker to run long CPU-bound tasks off the main thread
let canceled = false;

self.onmessage = function (e) {
  const data = e.data || {};
  if (data.cmd === 'start') {
    canceled = false;
    const actions = data.actions || 5;
    const iterations = data.iterations || 1e8;
    runActions(actions, iterations);
  } else if (data.cmd === 'cancel') {
    canceled = true;
  }
};

async function runActions(count, iterations) {
  for (let a = 0; a < count; a++) {
    if (canceled) {
      self.postMessage({ type: 'cancelled' });
      return;
    }
    const doneCount = await compute(iterations, (p) => {
      self.postMessage({ type: 'progress', action: a, progress: p });
    });
    if (canceled) {
      self.postMessage({ type: 'cancelled' });
      return;
    }
    self.postMessage({ type: 'actionDone', action: a, count: doneCount });
  }
  self.postMessage({ type: 'done' });
}

function compute(iterations, onProgress) {
  return new Promise((resolve) => {
    let i = 0;
    const chunk = 1000000; // run in chunks and post progress
    function step() {
      const end = Math.min(iterations, i + chunk);
      for (; i < end; i++) {
        // minimal work to simulate CPU load
        // no-op
      }
      onProgress(i / iterations);
      if (i < iterations && !canceled) {
        // yield to worker event loop so messages (like cancel) can be processed
        setTimeout(step, 0);
      } else {
        resolve(i);
      }
    }
    step();
  });
}
