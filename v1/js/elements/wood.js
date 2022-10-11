function simulateWood(x, y) {

    var random = Math.floor(Math.random() * (100 - 0 + 1)) + 1;

    var materialId = 4;

    var vec1 = getRandomVector();
    var vec2 = getRandomVector();

    var burn = false;

    if(random > 1) return;

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

function isFire(x, y) {
    return getCellMaterial(x, y) == 6 || getCellMaterial(x, y) == 17;
}

function multiplyFire(x, y) {
    clearCell(x, y);
    createCell(x, y, 6);
}