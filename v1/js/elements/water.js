function simulateWater(x, y) {

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    var dir = getRandomDirection();

    if(random == 10) return;

    if(isCellEmpty(x, y + 1) || getCellMaterial(x, y + 1) == 6) {
        moveCell(x, y, x, y + 1)
        return;
    }

    if(isCellEmpty(x + dir, y)) {
        moveCell(x, y, x + dir, y)
        return;
    }

    if(getCellMaterial(x, y + 1) == 7) {
        swapCells(x, y, x, y + 1);
        return;
    }

    increaseInactive(x, y);
}   