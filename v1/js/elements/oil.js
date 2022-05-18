function simulateOil(x, y) {

    var random = Math.floor(Math.random() * (100 - 0 + 1)) + 1;

    var dir = getRandomDirection();

    
    
    if(isCellEmpty(x, y + 1)) {
        moveCell(x, y, x, y + 1)
        return;
    }
    
    if(isCellEmpty(x + dir, y)) {
        moveCell(x, y, x + dir, y)
        return;
    }

    if(isFire(x, y + 1)) {
        clearCell(x, y);
        createCell(x, y, 6);
        return;
    }
    
    if(random > 1) return;
    
    var vec1 = getRandomVector();
    var vec2 = getRandomVector();

    if(isFire(x + vec1.x, y + vec1.y)) {
        moveCell(x + vec1.x, y + vec1.y, x, y);
        multiplyFire(x + vec1.x, y + vec1.y);
        return;
    } else if(isFire(x - vec1.x, y - vec1.y)) {
        moveCell(x - vec1.x, y - vec1.y, x, y);
        multiplyFire(x - vec1.x, y - vec1.y);
        return;
    } else if(isFire(x + vec2.x, y + vec2.y)) {
        moveCell( x + vec2.x, y + vec2.y, x, y);
        multiplyFire(x + vec2.x, y + vec2.y);
        return;
    } else if(isFire(x - vec2.x, y - vec2.y)) {
        moveCell(x - vec2.x, y - vec2.y, x, y);
        multiplyFire(x - vec2.x, y - vec2.y);
        return;
    } 

    increaseInactive(x, y);
}   

function isFire(x, y) {
    return getCellMaterial(x, y) == 6;
}

function multiplyFire(x, y) {
    clearCell(x, y);
    createCell(x, y, 6);
}