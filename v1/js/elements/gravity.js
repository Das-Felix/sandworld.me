function simulateGravity(cellX, cellY) {
    var materialId = 20;
    var x = cellX;
    var y = cellY;

    if(grid[y][x].data == undefined) return;

    if(grid[y][x].data.mat == 8) {
        clearCell(x, y);
        createCell(x, y, 6);
        return;
    }

    if(grid[y][x].data.dir == 1) {
        if(isCellEmpty(x, y + 1)) {
            moveCell(x, y, x, y + 1);
        } else {
            var gravityType = grid[y][x].data.mat;
            clearCell(x, y);
            createCell(x, y, gravityType);
        }
        return;
    }

    var random = Math.floor(Math.random() * (6 - 0 + 1)) + 1;
    var dir = getRandomDirection();

    if(isCellEmpty(x, y - 1)) {
        moveCell(x, y, x, y -1);
        y = y - 1;
    }   

    if(dir == 1) {
        grid[y][x].lifetime = grid[y][x].lifetime + 2;
    } else {
        grid[y][x].lifetime = grid[y][x].lifetime - random;
    }

    
    if(grid[y][x].lifetime <= 0) {
        grid[y][x].data.dir = 1;
        return;
    }

    var vector = getRandomVector();

    var dirX = vector.x;
    var dirY = vector.y;

    // if(getCellMaterial(x + dirX, y + dirY) == materialId) return;

    if(y == 0) {
        clearCell(x, y);
        return;
    }

    if(isCellEmpty(x - dirX, y + dirY)) {
        moveCell(x, y, x - dirX, y + dirY);
    }

    if(isCellEmpty(x + dirX, y + dirY)) {
        moveCell(x, y, x + dirX, y + dirY);
    }
}