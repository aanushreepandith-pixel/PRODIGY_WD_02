// Stopwatch variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval = null;
let isRunning = false;
let lapCounter = 1;

// Get DOM elements
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Event listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

// Start function
function start() {
    if (!isRunning) {
        interval = setInterval(updateTime, 10);
        isRunning = true;
        
        // Update button states
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

// Pause function
function pause() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

// Reset function
function reset() {
    clearInterval(interval);
    isRunning = false;
    
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCounter = 1;
    
    updateDisplay();
    
    // Clear lap times
    lapList.innerHTML = '';
    
    // Reset button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

// Update time function
function updateTime() {
    milliseconds += 1;
    
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
    }
    
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    
    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }
    
    updateDisplay();
}

// Update display function
function updateDisplay() {
    hoursDisplay.textContent = padZero(hours);
    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);
    millisecondsDisplay.textContent = padZero(milliseconds);
}

// Pad zero function
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// Record lap function
function recordLap() {
    if (isRunning) {
        const lapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Lap ${lapCounter}</span>
            <span>${lapTime}</span>
        `;
        
        lapList.insertBefore(li, lapList.firstChild);
        lapCounter++;
    }
}