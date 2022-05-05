function simulateOil(x, y) {

    var materialId = 7;

    var random = Math.floor(Math.random() * (21 - 0 + 1)) + 1;

    var dir = getRandomDirection();
    var vec1 = getRandomVector();
    var vec2 = getRandomVector();

    var random = Math.floor(Math.random() * (100 - 0 + 1)) + 1;

    if(random < 5) {
        if(isFire(x + vec1.x, y + vec1.y)) {
            moveCell(x + vec1.x, y + vec1.y, x, y);
            multiplyFire(x + vec1.x, y + vec1.y);
        } else if(isFire(x - vec1.x, y - vec1.y)) {
            moveCell(x - vec1.x, y - vec1.y, x, y);
            multiplyFire(x - vec1.x, y - vec1.y);
        } else if(isFire(x + vec2.x, y + vec2.y)) {
            moveCell( x + vec2.x, y + vec2.y, x, y);
            multiplyFire(x + vec2.x, y + vec2.y);
        } else if(isFire(x - vec2.x, y - vec2.y)) {
            moveCell(x - vec2.x, y - vec2.y, x, y);
            multiplyFire(x - vec2.x, y - vec2.y);
        } 
    }

    if(isCellEmpty(x, y + 1) || getCellMaterial(x, y + 1) == 6) {
        moveCell(x, y, x, y + 1)
        return;
    }

    if(isCellEmpty(x + dir, y)) {
        moveCell(x, y, x + dir, y)
        return;
    }
    

    increaseInactive(x, y);

}

function isFire(x, y) {
    return getCellMaterial(x, y) == 6;
}

function multiplyFire(x, y) {
    clearCell(x, y);
    createPixel(x, y, 6);
}