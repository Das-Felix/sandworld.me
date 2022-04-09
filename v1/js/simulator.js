
var grid = [];
var materials = [];
var bounding = [];

var currentMaterial = 1;

for(var i = 0; i < height; i++) {
    var gridRow = [];

    for(var j = 0; j < width; j++) {
        gridRow.push({
            type: 0,
            alpha: 255,
        });
    }

    grid.push(gridRow);
}

var runLeft = false;
var runLeftTime = 0;

var movedPixels = 0;
var maxMovedPixels = 3000;

var resetting = false;
var resetRow = 0;

function increaseMovedPixels() {
    movedPixels ++;
}

//Running the simulation
function simulate() {

    if(resetting) {
        if(resetRow == 300) {
            resetRow = 0;
            resetting = false;    
        }

        clearRow(resetRow);
        clearRow(resetRow + 1);
        clearRow(resetRow + 2);
        clearRow(resetRow + 3);
        clearRow(resetRow + 4);
    }


    for(var y = grid.length - 2; y !== 1; y--) {
        for(var x = 0; x !== grid[y].length; x++) {
            runSimulation(x, y); 
        }
    }
    
    if(resetting) resetRow += 5;
    

    drawGrid(grid);
    bounding = [];
}

function runSimulation(x, y) {  
    var cellType = grid[y][x].type;

    switch(cellType) {
        case 0:
            return;
        case 1:
            simulateSand(x, y);
            break;
        case 2:
            simulateWater(x, y);
            break;
        case 3:
            simulateStone(x, y);
            break;
        case 6:
            simulateFire(x, y);
            break;
        case 7:
            simulateOil(x, y);
            break;
        case 9:
            simulateAcid(x, y);
            break
        case 10:
            simulateSmoke(x, y);
            break;
    }
}


function isCellEmtpy(x, y) {
    return y >= 0 && y < height && x >= 0 && x < width && grid[y][x].type == 0;
}

function clearCell(x, y) {
    grid[y][x].type = 0;
}

function clearRow(y) {
    for(var i = 0; i < grid[y].length; i++) {
        clearCell(i, y);
    }
}

function isCellLiquid(x, y) {

    if(grid[y][x] == null) return false;

    return grid[y][x].type == 2 || grid[y][x].type == 7;

}

function isCellWater() {
    
}

function isCellOil() {

}

function isCellFlamable(x, y) {
    if(grid[y][x] == null) return false;

    return grid[y][x].type == 4 || grid[y][x].type == 7;

}

function setCell(x, y, material, alpha) {
    grid[y][x] = {
        type: material,
        alpha: alpha,
    };
}

function swapCells(x, y, x2, y2) {
    var cell1 = grid[y][x];
    var cell2 = grid[y2][x2];

    grid[y][x] = cell2;
    grid[y2][x2] = cell1;
}


function moveCell(x, y, newX, newY) {
    grid[newY][newX] = {
        type: grid[y][x].type,
        alpha: grid[y][x].alpha,
    }

    clearCell(x, y);
}


var currentAlpha = 200;
var mode = 1;
var last = 0;

function createPixel(x, y) {
    if(x > width || x < 0 || y > height || y < 0 || grid[y] == null || grid[y][x] == null) return;


    if(currentAlpha == 230 || currentAlpha == 199) mode = mode * -1; 

    last ++;
    if(last > 50) {
        currentAlpha = currentAlpha + (1 * mode);
        last = 0;
    }

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;


    var id = currentMaterial;

    if(id == 0) {
        grid[y][x].type = 0;
        return;
    }

    if(grid[y][x].type != 0) return;

    grid[y][x] = {
        type: id,
        alpha: currentAlpha + random,    
    };

    pixelCount++;
}

function setMat(id) {
    currentMaterial = id;
}

function reset() {
    resetRow = 0;
    resetting = true;
}