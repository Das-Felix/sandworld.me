
var grid = [];
var materials = [];

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

//Running the simulation
function simulate() {

    /*var random = Math.floor(Math.random() * (100 - 0 + 1)) + 1;
    
    if(random > 99) {
        runLeft = !runLeft;
    }*/
    
    //runLeftTime ++;

    if(runLeftTime > 100) {
        runLeft = !runLeft;
        runLeftTime = 0;
    }

    
    

    for(var y = grid.length - 2; y > 1; y--) {

        if(runLeft) {
            for(var x = 0; x < grid[y].length; x++) {
                runSimulation(x, y);
            }
            continue;
        }
        
        for(var x = grid[y].length; x > 0; x--) {
            runSimulation(x, y);
        }

        
    }
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
    }
}

function isCellEmtpy(x, y) {
    return grid[y][x] == 0;
}

function clearCell(x, y) {
    grid[y][x] = 0;
    clearPixel(x, y);
}

function isCellLiquid(x, y) {
    //TODO: Implement Material System

    return grid[y][x] == 2;

}

function isCellFlamable(x, y) {
    //TODO: Implement Material System

    return grid[y][x] == 3;

}

function setCell(x, y, material, color) {
    grid[y][x] = material;
    drawPixel(x, y, color)
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

function setMat(id) {
    currentMaterial = id;
}