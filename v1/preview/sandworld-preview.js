running = false;

var canvas;
var context;

var width;
var height;



function startSandworld(sandworldCanvas, sizeX, sizeY) {
    running = true;

    cavas = sandworldCanvas;
    context = canvas.getContext("2d");

    width = sizeX;
    height = sizeY;

    canvas.width = width;
    canvas.height = height;

    main();
}

function main() {
    var gameInterval = setInterval(simulate, refreshRate);

}

//Simulation

function simulate() {

    simulationFrame++;

    //Animation
    renderFrame(simulationFrame);

    if(!pause) {
        for(var y = 0; y < grid.length; y++) {
            for(var x = 0; x !== grid[y].length; x++) {
                if(reactToShockwave(x, y)) continue;
                if(grid[y][x].active && grid[y][x].clock != simulationFrame) {
                    runSimulation(x, y); 
                }
            }
        }
    }

    simulateShockwaves();    

    drawGrid(grid);
    bounding = [];
}

function runSimulation(x, y) {  
    var cellType = grid[y][x].type;
    grid[y][x].clock = simulationFrame; 

    switch(cellType) {
        case 0:
            return;
        case 1:
            simulateSand(x, y);
            break;
    }
}


//Functions


function generateGrid(w, h) {
    for(var i = 0; i < h; i++) {
        var gridRow = [];
    
        for(var j = 0; j < w; j++) {
            gridRow.push({
                type: 0,
                alpha: 255,
                data: 0,
                clock: 0,
                active: true,
                inactiveSince: 0,
                lifetime: 30,
            });
        }
    
        grid.push(gridRow);
    }
}


function isCellEmpty(x, y) {
    return grid[y] != null && grid[y][x] != null && grid[y][x].type == 0;
}

function clearCell(x, y, dec) {
    if(grid[y] == null || grid[y][x] == undefined) return;
    grid[y][x].type = 0;
    grid[y][x].lifetime = 60;
    grid[y][x].data = 0;

    if(dec == null) dec = 0;
    cellCount = cellCount - (1 - dec)

    reactivateCells(x, y);
}

function clearRow(y) {
    if(grid[y] == null) return;

    for(var i = 0; i < grid[y].length; i++) {
        clearCell(i, y, 1);
    }
}

function isCellFlamable(x, y) {
    if(grid[y] == null || grid[y][x] == null) return false;

    return grid[y][x].type == 4 || grid[y][x].type == 7;

}

function getCellMaterial(x, y) {
    if(grid[y] == null || grid[y][x] == null) return;
    return grid[y][x].type;
}

function setCell(x, y, material, alpha) {
    grid[y][x].type = material;
    grid[y][x].alpha = alpha;
    grid[y][x].active = true;
    grid[y][x].inactiveSince = 0;

}

function swapCells(x, y, x2, y2) {
    var cell1 = grid[y][x];
    var cell2 = grid[y2][x2];

    grid[y][x] = cell2;
    grid[y2][x2] = cell1;

}


function moveCell(x, y, newX, newY) {
    grid[newY][newX].type = grid[y][x].type;
    grid[newY][newX].alpha = grid[y][x].alpha;
    grid[newY][newX].active = true;
    grid[newY][newX].inactiveSince = 0;
    grid[newY][newX].clock = grid[y][x].clock;
    grid[newY][newX].lifetime = grid[y][x].lifetime;
    grid[newY][newX].data = grid[y][x].data;

    clearCell(x, y, 1);
}

var currentAlpha = 200;
var mode = 1;
var last = 0;

function createCell(x, y, material, force, data) {
    if(x > width || x < 0 || y > height || y < 0 || grid[y] == null || grid[y][x] == null) return;

    if(currentAlpha == 230 || currentAlpha == 199) mode = mode * -1; 

    last ++;
    if(last > 50) {
        currentAlpha = currentAlpha + (1 * mode);
        last = 0;
    }

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;


    var id = material || currentMaterial;

    if(id == 0) {
        if(grid[y][x].type != 0) cellCount--;
        grid[y][x].type = 0;
        return;
    }

    if(force || grid[y][x].type != 0) return;

    grid[y][x].type = id;
    grid[y][x].alpha = currentAlpha + random;
    grid[y][x].active = true;
    grid[y][x].inactiveSince = 0;
    grid[y][x].data = data;

    cellCount++;
    totalCellCount++;
}

function setMat(id) {
    currentMaterial = id;
}

function reset() {

    for(var i = 0; i < grid.length; i++) {
        clearRow(i);
    }

    cellCount = 0;
}

//Rendering



var glow = 50;
var lastGlowStep = 0;
var glowDirection = -1;

var maxGlow = 50;
var minGlow = 1;

function drawGrid(grid) {

    lastGlowStep ++;

    if(lastGlowStep == 3) {
        glow = glow + glowDirection;
        lastGlowStep = 0;
    }

    if(glow >= maxGlow || glow <= minGlow) {
        glowDirection = glowDirection * -1;
    }



    const imageData = context.createImageData(width, height);

    var index = 0;

    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {

            var cell = grid[i][j];
            var type = cell.type;
            var data = cell.data;
            var render = true;

            if(type == 20 && cell.data != null && cell.data.mat != null) type = cell.data.mat;

            var r = 0;
            var g = 0;
            var b = 0;
            var a = cell.alpha;

            switch(type) {
                case 0:
                    a = 0;
                    break;
                case 1:
                    r = 220;
                    g = 167;
                    b = 110;
                    break;
                case 2:
                    r = 152;
                    g = 189;
                    b = 249;
                    a = a - glow;

                    break;
                case 3:
                    r = 115;
                    g = 115;
                    b = 115;
                    break;
                case 4:
                    r = 110;
                    g = 74;
                    b = 56;
                    break;
                case 5:
                    r = 157;
                    g = 70;
                    b = 70;
                    break;
                case 6:
                    r = 255;
                    g = 100 + cell.data;
                    b = 100;
                    break;
                case 7:
                    r = 0;
                    g = 0;
                    b = 0;
                    break;
                case 8:
                    r = 70;
                    g = 6;
                    b = 0;
                    break;
                case 9:
                    r = 86;
                    g = 185;
                    b = 94;
                
                    break;
                case 10:
                    r = 0;
                    g = 0;
                    b = 0;
                    a = 255 - a;
                    break;
                case 11:
                    r = 156;
                    g = 69;
                    b = 163;
                    break;
                case 12:
                    r = 100;
                    g = 165;
                    b = 180;
                    break;
                case 13:
                    r = 245;
                    g = 182;
                    b = 197;
                    break;
                case 14:
                    r = 214;
                    g = 187;
                    b = 37;
                    break;
                case 15:
                    r = 128;
                    g = 105;
                    b = 74;
                    break;
                case 16:
                    if(data != null && data.flower) {
                        r = data.r;
                        g = data.g;
                        b = data.b;
                    } else {
                        r = 66;
                        g = 142;
                        b = 56;
                    }
                    break;
                case 17:
                    r = 214;
                    g = 95;
                    b = 51;
                    a = a - glow;
                    break;
                case 18:
                    r = 142;
                    g = 116;
                    b = 199;
                    break;
                case 44:
                    if(data != null) {
                        r = data.r;
                        g = data.g;
                        b = data.b;
                        break;
                    }

                    render = false;
                    break;

            }

            if(DEBUG) {
                if(!cell.active) a = a - 50;

                shockwaves.forEach(wave => {    
                    var dist = getDistance(j, i, wave.x, wave.y);
                    if(dist < wave.outer && dist > wave.inner) {
                        a = a + 50;
                        r = r + 100;
                    }
                });
            }
            

            if(render) {
                imageData.data[index + 0] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = a;               
            }


            index += 4;
        }
    }

    context.putImageData(imageData, 0, 0);
}



//Materials

