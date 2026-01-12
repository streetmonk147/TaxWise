// Script to open browser after Next.js dev server starts
const { exec } = require('child_process');
const http = require('http');
const os = require('os');

const platform = os.platform();
const url = 'http://localhost:3000';

function checkServer(callback) {
  const req = http.get(url, (res) => {
    callback(true);
  });
  
  req.on('error', () => {
    callback(false);
  });
  
  req.setTimeout(1000, () => {
    req.destroy();
    callback(false);
  });
}

function openBrowser() {
  let command;
  
  if (platform === 'win32') {
    // Windows - open Chrome
    command = `start chrome "${url}"`;
  } else if (platform === 'darwin') {
    // macOS - open Chrome
    command = `open -a "Google Chrome" "${url}"`;
  } else {
    // Linux - try Chrome or default browser
    command = `google-chrome "${url}" || xdg-open "${url}"`;
  }
  
  exec(command, (error) => {
    if (error) {
      console.log('\n⚠️  Could not open browser automatically.');
      console.log('Please open http://localhost:3000 manually in your browser.\n');
    } else {
      console.log('\n✅ Opening Chrome browser...\n');
    }
  });
}

// Check if server is ready, retry every 500ms
let attempts = 0;
const maxAttempts = 20; // 10 seconds max wait

const checkInterval = setInterval(() => {
  attempts++;
  checkServer((isReady) => {
    if (isReady) {
      clearInterval(checkInterval);
      openBrowser();
    } else if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.log('\n⚠️  Server did not start in time. Opening browser anyway...\n');
      openBrowser();
    }
  });
}, 500);
