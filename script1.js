let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerText = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerText = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerText = '00:00:00';
    startStopBtn.innerText = 'Start';
    laps = [];
    updateLaps();
}

function recordLap() {
    if (running) {
        const lapTime = display.innerText;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerText = (hours ? (hours > 9 ? hours : '0' + hours) + ':' : '') + 
                        (minutes > 9 ? minutes : '0' + minutes) + ':' + 
                        (seconds > 9 ? seconds : '0' + seconds) + '.' + 
                        (milliseconds > 9 ? milliseconds : '0' + milliseconds);
}
