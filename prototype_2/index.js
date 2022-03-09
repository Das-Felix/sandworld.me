const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var pixelSize = 5;
var refreshRate = 33;
var windowWithInPixels = 340;
var windowHeightInPixels = 200;
var chunkSize = 10;
var debugging = true;
var width = 1700;
var height = 1000;

//fps
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;


//Pixel
var grid = [];
var pixelData = [];


//Creating Grid Array

for(var i = 0; i < windowHeightInPixels; i++) {
    grid.push([]);
}

var pixelCount = 0;


//Fix:
//Auch die X-Kordinate vorher füllen und dann anhand von Strings den Typ des Pixels speichern
//Also das Array Direkt ganz befüllen und nicht nur auf der y Achese

function updatePixels() {
    //Simulating
    for(var y = grid.length; y > 1; y--) {
        if(grid[y] == undefined) continue;
        
        grid[y].forEach(x => {

            if(grid[(y + 1)] == undefined) return;

            if(!grid[(y + 1)].includes(x)) {
                grid[y].pop(grid[y].indexOf(x));
                grid[(y+1)].push(x);

            } else if(!grid[(y + 1)].includes((x - 1)) && x > -1 && x < windowWithInPixels) {
                grid[y].pop(grid[y].indexOf(x));
                grid[(y+1)].push((x-1));

            } else if(!grid[(y + 1)].includes((x + 1)) && x > -1 && x < windowWithInPixels) {

                grid[y].pop(grid[y].indexOf(x));
                grid[(y+1)].push((x+1));
            }
        })
    }

    //Framerate
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    drawArray();

    document.getElementById("pixelCount").innerHTML = pixelCount;
} 

function drawArray() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var y = 0; y < grid.length; y++) {
        grid[y].forEach(x => {
            drawPixel(x, y);
        });
    }
}


function drawPixel(x, y, color) {
    context.fillStyle = color || "#e0988d";
  	context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
}

function clearPixel(x, y) {
    context.clearRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    pixelCount --;
}

function createPixel(x, y) {
    grid[y].push(x);
    pixelCount++;
}


//Paint

var paintSize = 6;

canvas.addEventListener("mousedown", (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / Math.ceil(window.devicePixelRatio) / boundingRect.width;
    const scaleY = canvas.height / Math.ceil(window.devicePixelRatio) / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const realX = Math.min(Math.floor(canvasLeft), width - 1);
    const realY = Math.min(Math.floor(canvasTop), height - 1);
    
    const x = Math.round(realX / pixelSize, 0);
    const y = Math.round(realY / pixelSize, 0);



    for(var i = x-paintSize/2;i < x+paintSize/2; i++) {
        for(var j = y-paintSize/2;j < y+paintSize/2; j++) {
            createPixel(i, j);
            console.log("A")
        }
    }
});


//Running update
setInterval(updatePixels, refreshRate);

var fpsOut = document.getElementById('fps');
setInterval(function(){
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
},1000);