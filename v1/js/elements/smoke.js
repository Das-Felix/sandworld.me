function simulateSmoke(x, y) {

    var random = Math.floor(Math.random() * (20 - 0 + 1)) + 1;


    if(y == 0) {
        clearCell(x, y);
        return;
    }

    if(random == 10) {
        clearCell(x, y);
        return;
    }
    if(isCellEmpty(x, y - 1)) { 
        moveCell(x, y, x, y -1);
        y = y - 1;
    }   

    var vec = getRandomVector();

    if(isCellEmpty(x + vec.x, y + vec.y)) {
        moveCell(x, y, x + vec.x, y + vec.y);
    }


    // var materialId = 6;

    // var vector = getRandomVector();

    // var dirX = vector.x;
    // var dirY = vector.y;

    // if(getCellMaterial(x + dirX, y + dirY) == materialId) return;

    // if(y == 0) {
    //     clearCell(x, y);
    //     return;
    // }

    // if(isCellEmpty(x - dirX, y + dirY)) {
    //     moveCell(x, y, x - dirX, y + dirY);
    // }

    // if(isCellEmpty(x + dirX, y + dirY)) {
    //     moveCell(x, y, x + dirX, y + dirY);
    // }
}