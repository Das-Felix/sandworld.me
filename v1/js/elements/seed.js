function simulateSeed(x, y) {

    var burnVectors = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}]
    burnVectors.forEach(v => {
        if(isFire(x + v.x, y + v.y)) {
            clearCell(x, y);
            createCell(x, y, 6);
            return;
        }
    });

    if(isCellEmpty(x, y + 1)) {
        return moveCell(x, y, x, y + 1);
    }

    if(getCellMaterial(x, y + 1) != null && getCellMaterial(x, y + 1) == 2) {
        return swapCells(x, y, x, y + 1);
    }

    if(getCellMaterial(x, y - 1) == 16 && getCellMaterial(x + 1, y) == 16 && getCellMaterial(x - 1, y) == 16) {
        clearCell(x, y);
        return;
    }

    if(getCellMaterial(x, y + 1) != null && (getCellMaterial(x, y + 1) == 1 || getCellMaterial(x, y + 1) == 16)) {
        clearCell(x, y);
        return createCell(x, y, 16);
    }

    var dir = getRandomDirection();

    if(isCellEmpty(x + dir, y + 1)) {
        return moveCell(x, y, x + dir, y + 1);
    }
    

    increaseInactive(x, y);
}