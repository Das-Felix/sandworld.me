const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = true;

var cellCount = 0;
var refreshRate = 16;

var screenMode = "MOBILE";
var width = 200;
var height = 300;

canvas.width = width;
canvas.height = height;

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

var DEBUG = false;
var DEBUG_ALL = false;

checkDebug();

setScreenMode();

function Update() {
    
    simulate();


    //Framerate
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    //drawArray();

    document.getElementById("pixelCount").innerHTML = cellCount;
} 

function setScreenMode() {

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

var fpsOut = document.getElementById('fps');
setInterval(function(){
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
},1000);
 

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
}

function disableDebug() {
  DEBUG = false;
  DEBUG_ALL = false;

  window.localStorage.setItem("debug", false);
  window.localStorage.setItem("debug_all", false);
}

function setRefreshRate(rate) {
  clearInterval(gameInterval)
  gameInterval = setInterval(Update, rate);
}