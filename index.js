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
let workTime = 25;
let restTime = 5;
let count = isResting ? (restTime * 60) : (workTime * 60);

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
                timerBell()
                clearInterval(timer);
                timer = null;

                isResting = true;
                isPaused = true;

                count = 5 * 60;

                render(formatTime(count));

                startPause.textContent = "Start";
                startPause.style.backgroundColor = "#22c55e";

                return;
            } else {
                timerBell()
                clearInterval(timer);
                timer = null;

                isPaused = true;
                isResting = false;

                count = 25 * 60;

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
        count = 25 * 60;
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
        count = isResting ? restTime * 60 : workTime * 60;

        isPaused = true;
        render(formatTime(count));
        startPause.textContent = "Start";
        startPause.style.backgroundColor = "#22c55e"
    
}

function timerBell() {
    const audio = new Audio("bell.mp3");
    audio.play();
}
 
reset.addEventListener("click", resetCountdown);
startPause.addEventListener("click", startCountdown);
skip.addEventListener("click", skipCountdown);

function render(value) {
    countdown.innerHTML = value;
}