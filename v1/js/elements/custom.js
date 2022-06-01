var matData = {
    r: 100,
    g: 100,
    b: 100,
    gravity: 1,
    liquid: 0,
    weight: 0,
    density: 0,
}


function simulateCell(x, y) {
    var random = Math.floor(Math.random() * (99 - 0 + 1)) + 1;
    var moved = false;

    var data = grid[y][x].data;

    if(data == null) {
        data = structuredClone(matData);
        grid[y][x].data = data;
    }

    var movedY = false;

    var dirY = 1;
    if(data.gravity < 0) dirY = -1;

    for(var i = 1; i <= Math.abs(data.gravity); i++) {
        if(isCellEmpty(x, y + dirY)) {
            movedY = true;
            moved = true;
            moveCell(x, y, x, y + dirY);
            y = y + dirY;
            continue;
        }

        if(getCellData(x, y + dirY) != null && getCellData(x, y + dirY).density < data.density) {
            movedY = true;
            moved = true;
            swapCells(x, y, x, y + dirY);
            y = y + dirY;
            continue;
        }

        break;
    }

    var dir = getRandomDirection();


    if(!movedY && data.weight < random) {
        if(isCellEmpty(x + dir, y + dirY)) {
            movedY = true;
            moved = true;
            moveCell(x, y, x + dir, y + dirY);
            x = x + dir;
            y = y + dirY;
        } else if(getCellData(x + dir, y + dirY) != null && getCellData(x + dir, y + dirY).density < data.density) {
            movedY = true;
            moved = true;
            swapCells(x, y, x + dir, y + dirY);
            y = y + dirY;
            x = x + dir;
        }
    }

    if(!movedY && data.liquid > random) {
        if(isCellEmpty(x + dir, y)) {
            movedY = true;
            moved = true;
            moveCell(x, y, x + dir, y);
            x = x + dir;
        } else if(getCellData(x + dir, y) != null && getCellData(x + dir, y).density < data.density) {
            movedY = true;
            moved = true;
            swapCells(x, y, x + dir, y);
            x = x + dir;
        }
    }

    if(!moved) increaseInactive(x, y);
}

function getCellData(x, y) {
    if(grid[y] == null) return null;

    var cellData = grid[y][x];
    if(cellData == null) return null;


    return cellData.data;
}


function setRGB(r, g, b) { 
    matData.r = r;
    matData.g = g;
    matData.b = b;
}

function setGravity(g) {
    matData.gravity = g;
}

function setLiquid(f) {
    matData.liquid = f;
}

var sliderRed = document.getElementById("colorRed");
var sliderGreen = document.getElementById("colorGreen");
var sliderBlue = document.getElementById("colorBlue");

var sliderLiquid = document.getElementById("liquidValue");
var sliderGravity = document.getElementById("gravityValue");
var weightSlider = document.getElementById("weightValue");
var densitySlider = document.getElementById("densityValue");


sliderRed.addEventListener("input", () => {
    matData.r = parseInt(sliderRed.value);
}); 

sliderGreen.addEventListener("input", () => {
    matData.g = parseInt(sliderGreen.value);
}); 

sliderBlue.addEventListener("input", () => {
    matData.b = parseInt(sliderBlue.value);
}); 


sliderGravity.addEventListener("input", () => {
    matData.gravity = parseInt(sliderGravity.value);
    document.getElementById("gravityPreview").innerHTML = parseInt(sliderGravity.value);
}); 

sliderLiquid.addEventListener("input", () => {
    matData.liquid = parseInt(sliderLiquid.value);
}); 

weightSlider.addEventListener("input", () => {
    matData.weight = parseInt(weightSlider.value);
}); 

densitySlider.addEventListener("input", () => {
    matData.density = parseInt(densitySlider.value);
}); 