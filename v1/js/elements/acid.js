function simulateAcid(x, y) {

    var materialId = 9;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random >= 9) return;

    if(isCellEmpty(x, y + 1)) {
        moveCell(x, y, x, y + 1)
        return;
    }

    if(isCellEmpty(x + 1, y)) {
        moveCell(x, y, x + 1, y)
        return;
    }

    if(isCellEmpty(x - 1, y)) {
        if(random > 6) return;
        moveCell(x, y, x - 1, y);
        return;
    }

    //Removing Cells

    var d = [0,  11, 12, 9]

    if(y < height && d.indexOf(getCellMaterial(x, y + 1)) == -1) {
        clearCell(x, y);
        clearCell(x, y + 1);
        return;
    }

    if(!isCellEmpty(x + 1, y) && d.indexOf(getCellMaterial(x + 1, y)) == -1) {
        clearCell(x, y);
        clearCell(x + 1, y);
        return;
    }

    if(!isCellEmpty(x - 1, y) && d.indexOf(getCellMaterial(x - 1, y)) == -1) {
        clearCell(x, y);
        clearCell(x - 1, y);
        return;
    }

    if(!isCellEmpty(x, y - 1) && d.indexOf(getCellMaterial(x, y - 1)) == -1) {
        clearCell(x, y);
        clearCell(x, y - 1);
        return;
    }

    increaseInactive(x, y);
}