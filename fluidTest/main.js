var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

var grid = [];

const WIDTH = 32;
const HEIGHT = 32;

main();

function main() {

    canvas.height = HEIGHT;
    canvas.width = WIDTH;

    generateGrid(WIDTH, HEIGHT);
    drawGrid(grid);

    spawnCell(10, 10, 1);

}

function spawnCell(x, y, type) {
    grid[y][x].type = type;
}



function generateGrid(width, height) {
    for(var i = 0; i < width; i++) {
        var row = [];
        for(var j = 0; j < height; j++) {
            row.push({
                type: 0,
                alpha: 255,
                vecX: 0,
                vecY: 0,            
            });
        }

        grid.push(row);
    }
}

setInterval(function() {
    simulate(grid);
    drawGrid(grid);
}, 10);

function simulate(grid) {

    for(var x = 0; x < HEIGHT; x++) {
        for(var y = 0; y < WIDTH; y++) {

            var {type, vecX, vecY} = grid[x][y];

            if(type == 1) {
                
            }

        }
    }
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

    clearCell(x, y);
}


function isCellEmpty(x, y) {
    return grid[y] != null && grid[y][x] != null && grid[y][x].type == 0;
}

function clearCell(x, y) {
    if(grid[y] == null || grid[y][x] == undefined) return;
    grid[y][x].type = 0;
    grid[y][x].lifetime = 60;
    grid[y][x].data = 0;
}

function drawGrid(grid) {

    const imageData = context.createImageData(WIDTH, HEIGHT);

    var index = 0;

    for(var i = 0; i < HEIGHT; i++) {
        for(var j = 0; j < WIDTH; j++) {

            var cell = grid[i][j];
            var type = cell.type;
            var data = cell.data;
            var render = true;

            var r = 0;
            var g = 0;
            var b = 0;
            var a = cell.alpha;

            switch(type) {
                case 0:
                    a = 0;
                    break;
                case 1:
                    r = 255;
                    g = 100;
                    b = 100;
                    break;
            }

            imageData.data[index + 0] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = a;   

            index += 4;
        }
    }
    context.putImageData(imageData, 0, 0);
}
