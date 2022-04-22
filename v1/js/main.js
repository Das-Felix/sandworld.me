const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = true;

var pixelSize = 6;
var pixelCount = 0;
var refreshRate = 14;
var width = 150;
var height = 225;

canvas.width = width;
canvas.height = height;

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

function Update() {
    
    simulate();


    //Framerate
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    //drawArray();

    document.getElementById("pixelCount").innerHTML = pixelCount;
} 



function getPixelSize() {
    return pixelSize;
}

//Running update
setInterval(Update, refreshRate);

var fpsOut = document.getElementById('fps');
setInterval(function(){
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
},1000);
