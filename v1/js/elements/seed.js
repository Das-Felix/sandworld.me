function simulateSeed(x, y) {
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