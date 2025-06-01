// DOM Elements
const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const studyBtn = document.getElementById('studyBtn');
const gameBtn = document.getElementById('gameBtn');
const resetBtn = document.getElementById('resetBtn');

// Timer variables
let timeLeft = 0;
let timerInterval;
let currentMode = '';

// Time settings (in seconds)
const studyTime = 90 * 60;  // 1 hour 30 minutes
const gameTime = 40 * 60;   // 40 minutes

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update the timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

// Start the timer
function startTimer(duration, mode) {
    // Clear any existing timer
    clearInterval(timerInterval);
    
    // Set mode and initial time
    currentMode = mode;
    timeLeft = duration;
    updateDisplay();
    
    // Update mode display
    modeDisplay.textContent = mode === 'study' ? 
        '📚 Study Mode - Focus!' : 
        '🎮 Game Mode - Enjoy Free Fire!';
    modeDisplay.className = mode === 'study' ? 
        'mode-display study-mode' : 
        'mode-display game-mode';
    
    // Start countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            modeDisplay.textContent = mode === 'study' ? 
                '⏰ Study Time Over! Time to play!' : 
                '⏰ Gaming Time Over! Back to study!';
            // Play sound
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
            audio.play();
        }
    }, 1000);
}

// Event listeners
studyBtn.addEventListener('click', () => startTimer(studyTime, 'study'));
gameBtn.addEventListener('click', () => startTimer(gameTime, 'game'));
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeLeft = 0;
    currentMode = '';
    timerDisplay.textContent = '00:00';
    modeDisplay.textContent = 'Ready to Start!';
    modeDisplay.className = 'mode-display';
});

// Add to script.js
document.querySelector('.monogram').addEventListener('click', function() {
    this.querySelector('.author-photo').style.display = 
        this.querySelector('.author-photo').style.display === 'block' ? 'none' : 'block';
});

// Initialize
updateDisplay();