// settings
const settingsIcon = document.querySelector('.settings-icon');
const xIcon = document.querySelector('.x-icon');
const countdownTimer = document.querySelector('.countdown-timer');
const settings = document.querySelector('.settings');

const pomodorosDuration = document.querySelector('.pomodoros-duration');
const pomodorosQuantity = document.querySelector('.pomodoros-quantity');

let minusButtons = document.querySelectorAll('.minus');
minusButtons.forEach(item => {
    item.addEventListener('click', e => {
        if (e.target.nextSibling.textContent > 1) {
            e.target.nextSibling.textContent--;

            refreshData();
        }
    })
})

let plusButtons = document.querySelectorAll('.plus');
plusButtons.forEach(item => {
    item.addEventListener('click', e => {
        if (e.target.previousSibling.textContent < 60) {
            e.target.previousSibling.textContent++;

            refreshData();
        }
    })
})

function refreshData() {
    countdown.textContent = `${pomodorosDuration.textContent} : 00`;
    pomodoros.textContent = `0 / ${pomodorosQuantity.textContent}`;

    minutes = durationArray[0].textContent;
    pauseMinutes = durationArray[1].textContent;
    longPauseMinutes = durationArray[2].textContent;
}

settingsIcon.addEventListener('click', function() {
    countdownTimer.classList.remove('active');
    settings.classList.add('active');
})

xIcon.addEventListener('click', function() {
    countdownTimer.classList.add('active');
    settings.classList.remove('active');
})

// countdown

const countdown = document.querySelector('.countdown');
const container = document.querySelector('.container');

const pomodoros = document.querySelector('.pomodoros');

const pause = document.querySelector('.pause');
const stop = document.querySelector('.stop');
const play = document.querySelector('.play');

const durationArray = document.querySelectorAll('.duration');

let minutes = durationArray[0].textContent;
let pauseMinutes = durationArray[1].textContent;
let longPauseMinutes = durationArray[2].textContent;
let seconds = 0;
let pomodorosCount = 0;

let pauseCountdown = false;
let intervalId;

play.addEventListener('click', setPomodoroInterval);
pause.addEventListener('click', clearPomodoroInterval);
stop.addEventListener('click', stopPomodoro);

function setPomodoroInterval() {
    play.classList.remove('activeBtn');
    pause.classList.add('activeBtn');
    intervalId = setInterval(pomodoroCountdown, 1000);
}

function clearPomodoroInterval() {
    play.classList.add('activeBtn');
    pause.classList.remove('activeBtn');
    clearInterval(intervalId);
}

function stopPomodoro() {
    minutes = durationArray[0].textContent;
    seconds = 0;

    countdown.textContent = `${minutes} : 0${seconds}`;container.classList.remove('blue');
}

function pomodoroCountdown() {
    
    if (minutes > 0 || seconds > 0) {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        countdown.textContent = `${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
    } else {
        countdown.textContent = `0${pauseMinutes} : 0${seconds}`;
        container.classList.toggle('blue');

        if (!pauseCountdown) {
            
            pomodorosCount++;
            pomodoros.textContent = `${pomodorosCount} / ${durationArray[3].textContent}`;
            
            if (pomodorosCount%4 === 0) {
                minutes = longPauseMinutes;
            } else {
                minutes = pauseMinutes;
            }

        } else minutes = durationArray[0].textContent
        pauseCountdown = !pauseCountdown;

        if (pomodorosCount == durationArray[3].textContent) {
            clearInterval(intervalId);
        }
    }
}