const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var VERSION = "0.25.1";

context.imageSmoothingEnabled = true;

var cellCount = 0;

var totalCellCount = 0;
var lastTotalCellCountUpdate = 0;


var refreshRate = 16;

var screenMode = "MOBILE";
var width = 200;
var height = 300;

canvas.width = width;
canvas.height = height;

inputController.height = height;
inputController.width = width;


var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

var DEBUG = false;
var DEBUG_ALL = false;

var statusbar = document.getElementById("status-bar");

checkDebug();
loadTotalCellcount();

setScreenMode();

function Update() {
    
    simulate();
    saveTotalCellCount();


    //Framerate
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

} 

function setScreenMode() {

  if(display) {
    setCanvasSize(200, 300);
    screenMode = "DISPLAY";
    document.querySelector("body").classList.add(screenMode);
    generateGrid(width, height);
  
    return;
  }

  setCanvasSize(300, 200);
  screenMode = "DESKTOP";
  document.querySelector("body").classList.add(screenMode);
  generateGrid(width, height);

  return;

  var screenWidth = window.innerWidth;
  
  //Check Device

  if(screenWidth < 1000) {
    setCanvasSize(200, 300);
    screenMode = "MOBILE";
  } else {
    setCanvasSize(300, 200);
    screenMode = "DESKTOP";
  }

  document.querySelector("body").classList.add(screenMode);

  
  generateGrid(width, height);
}

function setCanvasSize(w, h) {
  width = w;
  height = h;

  canvas.width = width;
  canvas.height = height;

  inputController.width = width;
  inputController.height = height;
}

//Running Update
var gameInterval = setInterval(Update, refreshRate);

setInterval(function(){
  if(DEBUG) setStatus("DEBUG MODE | Cells: " + cellCount + " | FPS: " + (1000/frameTime).toFixed(1), "INFO");
},1000);
 

function loadTotalCellcount() {
  var total = window.localStorage.getItem("totalCellCount");

  if(total == null) return totalCellCount = 0;
  totalCellCount = parseInt(total);
}

function saveTotalCellCount() {
  if(simulationFrame - 300 > lastTotalCellCountUpdate) {
    lastTotalCellCountUpdate = simulationFrame;
    window.localStorage.setItem("totalCellCount", totalCellCount);
  }
}

//DEBUG

function checkDebug() {
  if(window.localStorage.getItem('debug') == "true") {
    DEBUG = true;
  }

  if(window.localStorage.getItem("debug_all") == "true") {
    DEBUG_ALL = true;
  }
}

function enableDebug(all) {
  DEBUG = true;
  DEBUG_ALL = true;

  window.localStorage.setItem("debug", true);

  if(all) window.localStorage.setItem("debug_all", true);
  document.querySelectorAll(".debug").forEach((el) => {
    el.classList.remove("hidden");
  });
}

function disableDebug() {
  DEBUG = false;
  DEBUG_ALL = false;

  window.localStorage.setItem("debug", false);
  window.localStorage.setItem("debug_all", false);

  clearStatus();
}

function setRefreshRate(rate) {
  clearInterval(gameInterval)
  gameInterval = setInterval(Update, rate);
}

//Statusbar

function setStatus(msg, type) {
  statusbar.innerHTML = msg;

  statusbar.classList.remove("warning");
  statusbar.classList.remove("info");

  switch(type) {
    case "WARN":
      statusbar.classList.add("warning");
      break;
    case "INFO":
      statusbar.classList.add("info")
      break;
  }
}

function clearStatus() {
  setStatus("v" + VERSION, "DISPLAY")
}