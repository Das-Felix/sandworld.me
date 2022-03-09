const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var pixelSize = 10;
var refreshRate = 30;
var windowWithInPixels = 60;
var windowHeightInPixels = 60;

//fps
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;


//Pixles
var pixels = [];
var pixelStates = [];

var pixelCount = 0;

/*for(var x = 0; x < windowWithInPixels; x++) {
    for(var y = 0; y < windowHeightInPixels; y++) {
        if(Math.floor((Math.random() * 100) + 1) > 99) {
            createPixel(x, y);
        }
    }
}*/

/*for(var i = 0; i < 81; i++) {
    createPixel(40, i);
}*/

function updatePixels() {
    
    createPixel(Math.floor((Math.random() * windowWithInPixels - 20) + 1), Math.floor((Math.random() * windowHeightInPixels) + 1));

    for(var y = windowHeightInPixels; y--; y > 0) {
        for(var x = 0; x < windowWithInPixels; x++) {
            var posString = "X:" + x + "Y:" + y;

            if(pixels.indexOf(posString) > -1) {
                if(pixels.indexOf("X:" + x + "Y:" + (y + 1)) <= -1) {

                    clearPixel(x, y);
                    drawPixel(x, y + 1);
                    pixels[pixels.indexOf(posString)] = "X:" + x + "Y:" + (y + 1);

                } else if(pixels.indexOf("X:" + (x - 1) + "Y:" + (y + 1)) <= -1) {

                    clearPixel(x, y);
                    drawPixel(x - 1, y + 1);
                    pixels[pixels.indexOf(posString)] = "X:" + (x - 1) + "Y:" + (y + 1);
                    
                } else if(pixels.indexOf("X:" + (x + 1) + "Y:" + (y + 1)) <= -1) {

                    clearPixel(x, y);
                    drawPixel(x + 1, y + 1);
                    pixels[pixels.indexOf(posString)] = "X:" + (x + 1) + "Y:" + (y + 1);
                    
                }

            }
        }
    }

    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    document.getElementById("pixelCount").innerHTML = pixelCount;
} 

function drawPixel(x, y, color) {
    context.beginPath();
    context.fillStyle = color || "#e0988d";
  	context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    context.fill();
    pixelCount ++;
}

function clearPixel(x, y) {
    context.clearRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    pixelCount --;
}

function createPixel(x, y) {
    drawPixel(x, y);
    pixels.push("X:" + x + "Y:" + y);
}


//Running update
setInterval(updatePixels, refreshRate);

var fpsOut = document.getElementById('fps');
setInterval(function(){
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
},1000);