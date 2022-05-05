function simulateSmoke(x, y) {
    var random = Math.floor(Math.random() * (6 - 0 + 1)) + 1;
    var dir = getRandomDirection();

    reactivateCells(x, y);

    if(isCellEmpty(x, y - 1)) { 
        moveCell(x, y, x, y -1);
        y = y - 1;
    }   

    if(dir == 1) {
        grid[y][x].lifetime = grid[y][x].lifetime + 1;
    } else {
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