function simulateAcid(x, y) {

    var materialId = 9;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random >= 9) return;

    if(isCellEmtpy(x, y + 1)) {
        moveCell(x, y, x, y + 1)
        return;
    }

    if(isCellEmtpy(x + 1, y)) {
        moveCell(x, y, x + 1, y)
        return;
    }

    if(isCellEmtpy(x - 1, y)) {
        if(random > 6) return;
        moveCell(x, y, x - 1, y);
        return;
    }

    if(isCellEmtpy(x + 1, y + 1)) {
        moveCell(x, y, x + 1, y + 1);
        return;
    }

    if(isCellEmtpy(x - 1, y + 1)) {
        moveCell(x, y, x - 1, y + 1);
        return;
    }

    //Removing Cells

    if(y < 300 && getCellMaterial(x, y + 1) != materialId) {
        clearCell(x, y);
        clearCell(x, y + 1);
        return;
    }

    if(getCellMaterial(x + 1, y) != materialId) {
        clearCell(x, y);
        clearCell(x + 1, y);
        return;
    }

    if(getCellMaterial(x - 1, y) != materialId) {
        clearCell(x, y);
        clearCell(x - 1, y);
        return;
    }

    if(!isCellEmtpy(x, y - 1) && getCellMaterial(x, y - 1) != materialId) {
        clearCell(x, y);
        clearCell(x, y - 1);
        return;
    }

    increaseInactive(x, y);
}