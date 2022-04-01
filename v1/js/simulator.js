
var grid = [];
var materials = [];
var bounding = [];

var currentMaterial = 1;

for(var i = 0; i < windowHeightInPixels; i++) {
    var gridRow = [];

    for(var j = 0; j < windowWithInPixels; j++) {
        gridRow.push(0);
    }

    grid.push(gridRow);
}

var runLeft = false;
var runLeftTime = 0;

var movedPixels = 0;
var maxMovedPixels = 3000;

function increaseMovedPixels() {
    movedPixels ++;
}

//Running the simulation
function simulate() {
    for(var y = grid.length - 2; y !== 1; y--) {

<<<<<<< HEAD
    /*var random = Math.floor(Math.random() * (100 - 0 + 1)) + 1;
    
    if(random > 99) {
        runLeft = !runLeft;
    }*/
    
    //runLeftTime ++;

    if(runLeftTime > 100) {
        runLeft = !runLeft;
        runLeftTime = 0;
    }

    
    

    for(var y = 0; y < grid.length; y++) {

        if(movedPixels > maxMovedPixels) {
            movedPixels = 0;
            continue;
        }

=======
        for(var x = 0; x !== grid[y].length; x++) {
>>>>>>> 5c1e1c0e80f00459364e1a53fc30c5b7e9986476

            runSimulation(x, y); 
        }
        continue;

        
    }

    bounding = [];
}

function runSimulation(x, y) {  
    var cellType = grid[y][x];

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

function setBounding(x, y) {
    bounding.push("X:" + x + "Y:" + y);
}

function isBounding(x, y) {
    return bounding.includes("X:" + x + "Y:" + y);
}

function isCellEmtpy(x, y) {
    return y > 0 && y < windowHeightInPixels && x > 0 && x < windowWithInPixels && grid[y][x] == 0;
}

function clearCell(x, y) {
    grid[y][x] = 0;
    clearPixel(x, y);
}

function getCellMaterial(x, y) {
    return grid[y][x];
}

function isCellLiquid(x, y) {
    //TODO: Implement Material System
    if(y > 0 || y < windowHeightInPixels || x > 0 || x < windowWithInPixels || grid[y] != null) return false;



    return grid[y][x] == 2 || grid[y][x] == 7;

}

function isCellWater() {
    
}

function isCellOil() {

}

function isCellFlamable(x, y) {
    //TODO: Implement Material System

    return grid[y][x] == 4 || grid[y][x] == 7;

}

function setCell(x, y, material, color) {
    setBounding(x, y);
    grid[y][x] = material;
    drawPixel(x, y, color)
}

function createPixel(x, y) {
    if(x > windowWithInPixels || x < 0 || y > windowHeightInPixels || y < 0) return;


    var id = currentMaterial;

    if(id == 0) {
        clearPixel(x, y);
        grid[y][x] = 0;
        return;
    }

    if(grid[y][x] != 0) return;

    grid[y][x] = id;

    switch(id) {
        case 1:
            drawPixel(x, y, sndColors[0]);
    }

    if(id == 4) {
        drawPixel(x, y, "#693D1E");
    }

    pixelCount++;
}

function setMat(id) {
    currentMaterial = id;
}

function reset() {
    grid = [];

    for(var i = 0; i < windowHeightInPixels; i++) {
        var gridRow = [];
    
        for(var j = 0; j < windowWithInPixels; j++) {
            gridRow.push(0);
        }
    
        grid.push(gridRow);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
}