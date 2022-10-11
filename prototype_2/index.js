const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var pixelSize = 5;
var refreshRate = 10;
var windowWithInPixels = 340;
var windowHeightInPixels = 200;
var chunkSize = 10;
var debugging = true;
var width = 1000;
var height = 800;

canvas.width = width;
canvas.height = height;

windowHeightInPixels = height / pixelSize;
windowWithInPixels = width / pixelSize;

//fps
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

var colors = new Map();


//Sand
colors.set(1, ["#efbf77", "#e9ba74", "#f0c078", "#e3b672", "#d2a869", "#efbf77", "#e9ba74", "#f0c078", "#e3b672", "#d2a869"]);
//Water
colors.set(2, ["#0964f7", "#0964f7", "#0964f7", "#0964f7", "#0964f7", "#0964f7", "#0964f7", "#0964f7"])


//Pixel
var grid = [];
var pixelData = [];


var currentMaterial = 1;

//Creating Grid Array

for(var i = 0; i < windowHeightInPixels; i++) {
    var gridRow = [];

    for(var j = 0; j < windowWithInPixels; j++) {
        gridRow.push(0);
    }

    grid.push(gridRow);
}

console.log(grid)

var pixelCount = 0;

var colorIndex = 0;

function updatePixels() {
    //Simulating
    //context.clearRect(0, 0, canvas.width, canvas.height);

    var waterDirection = true;

    for(var y = grid.length - 2; y > 1; y--) {

        colors.set(1, shuffle(colors.get(1)));
        colors.set(2, shuffle(colors.get(2)));

        for(var x = 0; x < grid[y].length; x++) {
            
            colorIndex = colorIndex + 1;

            if(colorIndex >= 5 ) {
                colorIndex = 0;
            }

            //Check if there is a pixel, otherwise continue loop
            if(grid[y][x] == 0) continue;

            //Sand1
            if(grid[y][x] == 1) {

                var sandColor = colors.get(1)[colorIndex];
                var waterColor = colors.get(2)[colorIndex];
                

                if(grid[(y + 1)][x] == 0) {
                    grid[y][x] = 0;
                    grid[(y + 1)][x] = 1;

                    clearPixel(x, y)
                    drawPixel(x, (y + 1), sandColor);
                    continue;
                }

                if(grid[(y + 1)][(x + 1)] == 0 && grid[(y + 1)][(x - 1)] == 0) {
                    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

                    if(random > 5) {
                        grid[y][x] = 0;
                        grid[(y + 1)][(x - 1)] = 1;
    
                        clearPixel(x, y);
                        drawPixel((x - 1), (y + 1), sandColor);
                    } else {
                        grid[y][x] = 0;
                        grid[(y + 1)][(x + 1)] = 1;

                        clearPixel(x, y);
                        drawPixel((x + 1), (y + 1), sandColor);
                    }

                    continue;

                }

                if(grid[(y + 1)][(x + 1)] == 0) {
                    grid[y][x] = 0;
                    grid[(y + 1)][(x + 1)] = 1;

                    clearPixel(x, y);
                    drawPixel((x + 1), (y + 1), sandColor);
                    continue;
                }

                if(grid[(y + 1)][(x - 1)] == 0) {
                    grid[y][x] = 0;
                    grid[(y + 1)][(x - 1)] = 1;

                    clearPixel(x, y);
                    drawPixel((x - 1), (y + 1), sandColor);
                    continue;
                }


                //Sand in Water

                if(grid[(y + 1)][(x + 1)] == 2 && grid[(y + 1)][(x - 1)] == 2) {
                    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

                    if(random > 5) {
                        grid[y][x] = 2;
                        grid[(y + 1)][(x + 1)] = 1;

                        clearPixel(x, y);
                        drawPixel(x, y, waterColor);
                        drawPixel((x + 1), (y + 1), sandColor);
                    } else {
                        grid[y][x] = 2;
                        grid[(y + 1)][(x - 1)] = 1;
    
                        clearPixel(x, y)
                        drawPixel(x, y, waterColor);
                        drawPixel((x - 1), (y + 1), sandColor);
                    }

                    continue;

                }

                if(grid[(y + 1)][x] == 2) {
                    grid[y][x] = 2;
                    grid[(y + 1)][x] = 1;

                    drawPixel(x, y, waterColor);
                    drawPixel(x, (y + 1), sandColor);
                    continue;
                }

                if(grid[(y + 1)][(x + 1)] == 2) {
                    grid[y][x] = 2;
                    grid[(y + 1)][(x + 1)] = 1;

                    drawPixel(x, y, waterColor);
                    drawPixel((x + 1), (y + 1), sandColor);
                    continue;
                }

                if(grid[(y + 1)][(x - 1)] == 2) {
                    grid[y][x] = 2;
                    grid[(y + 1)][(x - 1)] = 1;

                    drawPixel(x, y, waterColor);
                    drawPixel((x - 1), (y + 1), sandColor);
                    continue;
                }
            }


            //WATER
            if(grid[y][x] == 2) {

                var waterColor = colors.get(2)[colorIndex];

                if(grid[(y + 1)][x] == 0) {
                    grid[y][x] = 0;
                    grid[(y + 1)][x] = 2;

                    clearPixel(x, y)
                    drawPixel(x, (y + 1), waterColor);
                    continue;
                }

                if(grid[(y + 1)][(x + 1)] == 0 && grid[(y + 1)][(x - 1)] == 0) {
                    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

                    if(random > 5) {
                        grid[y][x] = 0;
                        grid[(y + 1)][(x - 1)] = 2;
    
                        clearPixel(x, y);
                        drawPixel((x - 1), (y + 1), waterColor);
                    } else {
                        grid[y][x] = 0;
                        grid[(y + 1)][(x + 1)] = 2;

                        clearPixel(x, y);
                        drawPixel((x + 1), (y + 1), waterColor);
                    }

                    continue;

                }

                if(grid[(y + 1)][(x + 1)] == 0) {
                    grid[y][x] = 0;
                    grid[(y + 1)][(x + 1)] = 2;

                    clearPixel(x, y);
                    drawPixel((x + 1), (y + 1), waterColor);
                    continue;
                }

                if(grid[(y + 1)][(x - 1)] == 0) {
                    grid[y][x] = 0;
                    grid[(y + 1)][(x - 1)] = 2;

                    clearPixel(x, y);
                    drawPixel((x - 1), (y + 1), waterColor);
                    continue;
                }

                if(grid[y][(x + 1)] == 0) {
                    grid[y][x] = 0;
                    grid[y][(x + 1)] = 2;

                    clearPixel(x, y);
                    drawPixel((x + 1), y, waterColor);
                    continue;
                }

                if(grid[y][(x - 1)] == 0) {
                    grid[y][x] = 0;
                    grid[y][(x - 1)] = 2;

                    clearPixel(x, y);
                    drawPixel((x - 1), y, waterColor);
                    continue;
                }

            }

            //Fire
            if(grid[y][x] == 4) {

                var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

                drawPixel(x, y, "#e56a12")

                if(grid[(y + 1)][x] == 3) {
                    if(random > 8) {
                        drawPixel(x, y + 1, "#e56a12");
                        grid[(y + 1)][x] = 4;
                        continue;
                    } 
                }

                if(grid[y][(x - 1)] == 3) {
                    if(random > 8) {
                        drawPixel(x - 1, y, "#e56a12");
                        grid[y][(x - 1)] = 4;
                        continue;
                    } 
                }

                if(grid[y][(x + 1)] == 3) {
                    if(random > 8) {
                        drawPixel(x + 1, y, "#e56a12");
                        grid[y][(x + 1)] = 4;
                        continue;
                    } 
                }

                //Move Pixel Randomly
                
                var moveX = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
                var moveY = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

                if(random < 2) {
                    grid[y][x] = 0;
                    clearPixel(x, y);
                }
            }


        }
    }

    //Framerate
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    //drawArray();

    document.getElementById("pixelCount").innerHTML = pixelCount;
} 


//Color Changer
/*setInterval(() => {
    for(var y = grid.length - 2; y > 1; y--) {
        for(var x = 0; x < grid[y].length; x++) {
            if(grid[y][x] == 2) {
                var colorIndex = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                var waterColor = colors.get(2)[colorIndex];
                drawPixel(x, y, waterColor)
            }
        }
    }
}, 200);
*/

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
}

function createPixel(x, y) {

    var id = currentMaterial;

    if(id == 0) {
        clearPixel(x, y);
        grid[y][x] = 0;
        return;
    }

    if(grid[y][x] != 0) return;

    grid[y][x] = id;

    if(id == 3) {
        drawPixel(x, y, "#331a14");
    }

    pixelCount++;
}


//Paint



//Running update
setInterval(updatePixels, refreshRate);

var fpsOut = document.getElementById('fps');
setInterval(function(){
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
},1000);

//Utils
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}