var timerOn; // id for setInterval
var inProgress = false;
var count = 1;

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

        return ("0" + hours).slice(-2) +
         ":" + ("0" + minutes).slice(-2) +
         ":" + ("0" + seconds).slice(-2) +
         "." + ("00" + miliseconds).slice(-3);
    }

    this.draw = function() {
        this.container.innerHTML = this.toString();
    }
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
        var current = timer.timePassed;
        startButton.innerText = "pause";
        startButton.className = "button btn btn-primary btn-lg";
        var start = Date.now();
        timerOn = setInterval(function() {
            timer.timePassed = Date.now() + current - start;
            timer.draw();
        }, 1);
        inProgress = true;
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
// creates and appends paragraph with time stop
function printTime(msg) {
    var timestop = document.createElement("p");
    timestop.innerText = count + " " + msg + ": " + timer.toString();
    timestop.className = "timestop";
    container.appendChild(timestop);
    count++;
}

startButton.addEventListener("click", startTimer, false);
splitButton.addEventListener("click", splitTime, false);
resetButton.addEventListener("click", resetTimer, false);

timer = new Timer(0, timerContainer);
timer.draw();
