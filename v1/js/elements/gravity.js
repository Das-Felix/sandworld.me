function simulateGravity(cellX, cellY) {


    var materialId = 20;
    var x = cellX;
    var y = cellY;

    if(grid[y][x].data == 0) grid[y][x].data = 2;

    var random = Math.floor(Math.random() * (6 - 0 + 1)) + 1;
    var dir = getRandomDirection();

    if(isCellEmpty(x, y - 1)) {
        moveCell(x, y, x, y -1);
        y = y - 1;
    }   

    if(dir == 1) {
        grid[y][x].lifetime = grid[y][x].lifetime + 1;
    } else if(!getCellMaterial(x + 1, y) == 6 || !getCellMaterial(x - 1, y)) {
        grid[y][x].lifetime = grid[y][x].lifetime - random;
    }

    
    if(grid[y][x].lifetime <= 0) {
        var gravityType = grid[y][x].data;
        clearCell(x, y);
        createPixel(x, y, gravityType);
        return;
    }

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