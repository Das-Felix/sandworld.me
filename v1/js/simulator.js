
var grid = [];
var materials = [];
var bounding = [];

var inactiveValue = 20;

var currentMaterial = 1;

for(var i = 0; i < height; i++) {
    var gridRow = [];

    for(var j = 0; j < width; j++) {
        gridRow.push({
            type: 0,
            alpha: 255,
            active: true,
            inactiveSince: 0,
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

var simulationFrame = 0;

//Running the simulation
function simulate() {

    simulationFrame++;

    renderFrame(simulationFrame);

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


    for(var y = grid.length - 2; y >= 0; y--) {
        for(var x = 0; x !== grid[y].length; x++) {
            if(grid[y][x].active) {
                runSimulation(x, y); 
            }
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

function increaseInactive(x, y) {

    var i = grid[y][x].inactiveSince;

    if(i > inactiveValue) {
        grid[y][x].active = false;
        return;
    }

    grid[y][x].inactiveSince = i + 1;
}

function isCellEmtpy(x, y) {
    return grid[y] != null && grid[y][x] != null && grid[y][x].type == 0;
}

function clearCell(x, y) {
    if(grid[y] == null || grid[y][x] == undefined) return;
    grid[y][x].type = 0;
    reactivateCells(x, y);
}

function clearRow(y) {
    if(grid[y] == null) return;

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
    if(grid[y] == null || grid[y][x] == null) return false;

    return grid[y][x].type == 4 || grid[y][x].type == 7;

}

function getCellMaterial(x, y) {
    if(grid[y] == null || grid[y][x] == null) return;
    return grid[y][x].type;
}

function setCell(x, y, material, alpha) {
    grid[y][x] = {
        type: material,
        alpha: alpha,
        active: true,
        inactiveSince: 0,
    };
    reactivateCells(x, y);
}

function swapCells(x, y, x2, y2) {
    var cell1 = grid[y][x];
    var cell2 = grid[y2][x2];

    grid[y][x] = cell2;
    grid[y2][x2] = cell1;

    reactivateCells(x, y);
}


function moveCell(x, y, newX, newY) {
    grid[newY][newX] = {
        type: grid[y][x].type,
        alpha: grid[y][x].alpha,
        active: true,
        inactiveSince: 0,
    }

    clearCell(x, y);

    reactivateCells(x, y);
}

function reactivateCells(x, y) {
    reactivateCell(x, y + 1);
    reactivateCell(x, y - 1);
    reactivateCell(x + 1, y);
    reactivateCell(x - 1, y);
}

function reactivateCell(x, y) {
    if(grid[y] == null || grid[y][x] == null) return;

    grid[y][x].active = true;
    grid[y][x].inactiveSince = 0;
}


var currentAlpha = 200;
var mode = 1;
var last = 0;

function createPixel(x, y, material) {
    if(x > width || x < 0 || y > height || y < 0 || grid[y] == null || grid[y][x] == null) return;

    reactivateCells(x, y);

    if(currentAlpha == 230 || currentAlpha == 199) mode = mode * -1; 

    last ++;
    if(last > 50) {
        currentAlpha = currentAlpha + (1 * mode);
        last = 0;
    }

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;


    var id = material || currentMaterial;

    if(id == 0) {
        grid[y][x].type = 0;
        return;
    }

    if(grid[y][x].type != 0) return;

    grid[y][x] = {
        type: id,
        alpha: currentAlpha + random,
        active: true,
        inactiveSince: 0    
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