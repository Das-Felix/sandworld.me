function simulateFire(cellX, cellY) {
    var x = cellX;
    var y = cellY;

    var random = Math.floor(Math.random() * (6 - 0 + 1)) + 1;
    var dir = getRandomDirection();

    grid[y][x].data = random * 8 * dir;

    if(dir == 1) {
        grid[y][x].lifetime = grid[y][x].lifetime + 1;
    } else if(!getCellMaterial(x + 1, y) == 6 || !getCellMaterial(x - 1, y)) {
        grid[y][x].lifetime = grid[y][x].lifetime - random;
    }

    
    if(grid[y][x].lifetime <= 0) {
        clearCell(x, y);
        return;
    }

    var materialId = 6;

    var vector = getRandomVector();

    var dirX = vector.x;
    var dirY = vector.y;

    if(getCellMaterial(x + dirX, y + dirY) == materialId) return;

    if(isCellEmpty(x, y - 1)) {
        moveCell(x, y, x, y -1);
        y = y - 1;
    }   

    if(isCellEmpty(x - dirX, y + dirY)) {
        moveCell(x, y, x - dirX, y + dirY);
    }

    if(isCellEmpty(x + dirX, y + dirY)) {
        moveCell(x, y, x + dirX, y + dirY);
    }

    //Burning

    if(getCellMaterial(x + dirX, y - dirY) == 4 && random == 1) {
        clearCell(x + dirX, y + dirY)
        moveCell(x, y, x + dirX, y + dirY);
        createPixel(x, y, 6);
        return;
    }

    //TNT
    if(getCellMaterial(x + dirX, y + dirY) == 8) {
        clearCell(x + dirX, y + dirY)
        moveCell(x, y, x + dirX, y + dirY);
        createPixel(x, y, 6);
        return;
    }


}