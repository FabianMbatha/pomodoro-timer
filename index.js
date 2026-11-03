const startPause = document.getElementById("startPause");
const countdown = document.getElementById("timer");
const completedSessions = document.getElementById("completed-sessions");
const reset = document.getElementById("reset");
const skip = document.getElementById("skip");

let isStarted = false;
let isPaused = false;
let isResting = false;

let timer;
let completed = 0;
let workTime = 5;
let restTime = 3;
let count = isResting ? (restTime * 1) : (workTime * 1);

function formatTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let formattedMins = String(minutes).padStart(2, "0");
    let formattedSecs = String(seconds).padStart(2, "0");
    return formattedMins + ":" + formattedSecs;
}

render(formatTime(count));

function startCountdown() {
    
    if (isPaused) {
        isPaused = false;
        startPause.textContent = "Pause";
        startPause.style.backgroundColor = "Red";
    }

    if (timer) {
        clearInterval(timer);
        timer = null;
        isPaused = true;
        startPause.textContent = "Resume";
        startPause.style.backgroundColor = "#22c55e";
        startPause.style.border = "#22c55e";
        return;
    }

    isPaused = false;
    startPause.textContent = "Pause";
    startPause.style.backgroundColor = "red";
    startPause.style.border = "red";

    timer = setInterval(() => {
        count--;
        render(formatTime(count));

        if (count <= 0) {
            if (!isResting) {
                clearInterval(timer);
                timer = null;

                isResting = true;
                isPaused = true;

                count = 3;

                render(formatTime(count));

                startPause.textContent = "Start";
                startPause.style.backgroundColor = "#22c55e";

                return;
            } else {
                clearInterval(timer);
                timer = null;

                isPaused = true;
                isResting = false;

                count = 5;

                completed++;
                completedSessions.innerText = completed;

                render(formatTime(count));

                startPause.textContent = "Start";
                startPause.style.backgroundColor = "#22c55e";

                return;
            }
        }
    }, 1000);
}

function resetCountdown() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        isPaused = true;
        startPause.style.backgroundColor = "#22c55e"
    }
        isPaused = true;
        count = 5;
        countdown.textContent = formatTime(count);
        startPause.textContent = "Start";
}

function skipCountdown() {
    clearInterval(timer);
    timer = null;

    if (!isResting) {
        completed++;
        completedSessions.innerText = completed;
    }
        
        isResting = !isResting;
        count = isResting ? restTime : workTime;

        isPaused = true;
        render(formatTime(count));
        startPause.textContent = "Start";
        startPause.style.backgroundColor = "#22c55e"
    
}

reset.addEventListener("click", resetCountdown);
startPause.addEventListener("click", startCountdown);
skip.addEventListener("click", skipCountdown);

function render(value) {
    countdown.innerHTML = value;
}