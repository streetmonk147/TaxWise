// Start Next.js dev server and open Chrome browser
const { spawn } = require('child_process');
const http = require('http');
const os = require('os');

const platform = os.platform();
const url = 'http://localhost:3000';

// Function to open browser
function openBrowser() {
  let command;
  let args = [];
  
  if (platform === 'win32') {
    // Windows - open Chrome
    command = 'cmd';
    args = ['/c', 'start', 'chrome', url];
  } else if (platform === 'darwin') {
    // macOS - open Chrome
    command = 'open';
    args = ['-a', 'Google Chrome', url];
  } else {
    // Linux - try Chrome or default browser
    command = 'google-chrome';
    args = [url];
  }
  
  const browser = spawn(command, args, { 
    stdio: 'ignore',
    detached: true,
    shell: true 
  });
  
  browser.unref();
}

// Function to check if server is ready
function checkServer(callback) {
  const req = http.get(url, { timeout: 1000 }, (res) => {
    callback(true);
  });
  
  req.on('error', () => {
    callback(false);
  });
  
  req.on('timeout', () => {
    req.destroy();
    callback(false);
  });
}

// Start Next.js dev server
console.log('🚀 Starting Next.js development server...\n');
const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Wait for server to be ready, then open browser
let attempts = 0;
const maxAttempts = 30; // 15 seconds max wait

const checkInterval = setInterval(() => {
  attempts++;
  checkServer((isReady) => {
    if (isReady) {
      clearInterval(checkInterval);
      console.log('\n✅ Server is ready! Opening Chrome...\n');
      setTimeout(() => {
        openBrowser();
      }, 1000);
    } else if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.log('\n⚠️  Opening browser (server may still be starting)...\n');
      openBrowser();
    }
  });
}, 500);

// Handle process termination
process.on('SIGINT', () => {
  clearInterval(checkInterval);
  nextDev.kill('SIGINT');
  process.exit();
});

process.on('SIGTERM', () => {
  clearInterval(checkInterval);
  nextDev.kill('SIGTERM');
  process.exit();
});
