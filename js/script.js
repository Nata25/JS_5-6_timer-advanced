var timerOn;
var current = 0;
var inProgress = false;

var timerContainer = myTimer;
var startButton = document.getElementById("start");
var splitButton = document.getElementById("split");
var resetButton = document.getElementById("reset");
var container = document.getElementsByClassName("jumbotron")[0];

function Timer(time, container) {
    this.timePassed = time;
    this.container = container;

    this.toString = function() {
        var seconds, minutes, hours;
        hours = Math.floor(this.timePassed / 3600000);
        minutes = Math.floor((this.timePassed / 60000) % 60);
        seconds = Math.floor((this.timePassed / 1000) % 60);
        miliseconds = this.timePassed % 1000;

        return leadingZero(hours, 2) +
         ":" + leadingZero(minutes, 2) +
         ":" + leadingZero(seconds, 2) +
         "." + leadingZero(miliseconds, 3);
    }

    this.draw = function() {
        this.container.innerHTML = this.toString();
    }
}

// Helper for toString() method; add leading 0
// @param num, base number > 0
// @return string
function leadingZero(num, base) {
    return ("00" + num).slice(-base);
}

// Event listener for start/pause/continue button
function startTimer() {
    if (inProgress) {
        startButton.innerText = "continue";
        startButton.className = "button btn btn-success btn-lg";
        clearInterval(timerOn);
        timer.draw();
        inProgress = false;
        printTime("Stop");
    }
    else {
        startButton.className = "button btn btn-primary btn-lg";
        startButton.innerText = "pause";
        var start = Date.now();
        timerOn = setInterval(function() {
            timer.timePassed = Date.now() + current - start;
            timer.draw();
        }, 1);
        inProgress = true;
        current = timer.timePassed;
    }
}

// Event listener for split button
function splitTime() {
    if (inProgress) {
        printTime("Split");
    }
}

// Event listener for reset button
function resetTimer() {
    clearInterval(timerOn);
    timer.timePassed = 0;
    timer.draw();
    startButton.innerText = "start";
    startButton.className = "button btn btn-success btn-lg";
    inProgress = false;
    var timestops = document.getElementsByClassName("timestop");
    while (timestops[0]) {
        container.removeChild(timestops[0]);
    }
}

// helper for event listeners
// creates and appends <p> with time stop
function printTime(msg) {
    var timestop = document.createElement("p");
    timestop.innerText = msg + ": " + timer.toString();
    timestop.className = "timestop";
    container.appendChild(timestop);
}

startButton.addEventListener("click", startTimer, false);
splitButton.addEventListener("click", splitTime, false);
resetButton.addEventListener("click", resetTimer, false);

timer = new Timer(0, timerContainer);
timer.draw();
