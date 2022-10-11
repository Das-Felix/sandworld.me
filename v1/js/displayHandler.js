const { ipcRenderer } = require('electron');

var inactiveSince = 0;
var infoSince = 0;

var infoOpen = false;

var inactiveCountdown = 20;
var inactiveCountdownEnabled = false;

var INACTIVE_AFTER = 300;

function toggleInfo() {
    document.getElementById("info-page").classList.toggle("hidden");
    infoOpen = !infoOpen;

    if(!infoOpen) {
        infoSince = 0;
    }
}

function resetResetCountdown() {
    inactiveSince = 0;
    document.getElementById("countdown").classList.add("hidden");
    inactiveCountdownEnabled = false;

}

setInterval(() => {

    if(infoOpen) {
        infoSince++;

        if(infoSince > 30) {
            toggleInfo();
            return;
        }
    }

    if(inactiveCountdownEnabled) {
        inactiveCountdown = inactiveCountdown - 1;
        document.getElementById("countdown-time").innerHTML = inactiveCountdown;

        if(inactiveCountdown == 0) {
            reset();
            playAnimation();
            inactiveCountdown = 10;
            document.getElementById("countdown").classList.add("hidden");  
            inactiveSince = 0;
            inactiveCountdownEnabled = false;
        }

        return;
    }

    inactiveSince++;

    if(inactiveSince > INACTIVE_AFTER) {
        document.getElementById("countdown").classList.remove("hidden");
        inactiveCountdown = 10;
        inactiveCountdownEnabled = true;
        document.getElementById("countdown-time").innerHTML = inactiveCountdown;
    }
}, 1000);

function saveGridToLocalStorage() {
    localStorage.setItem("grid", JSON.stringify(grid));
}

function loadGridFromLocalStorage() {
    var gridData = localStorage.getItem("grid");
    if(gridData != null) {
        grid = JSON.parse(gridData);
    }
}

function exit() {
    ipcRenderer.send('exit');
}