function simulateAcid(x, y) {

    var materialId = 9;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random >= 9) return;

    if(isCellEmpty(x, y + 1)) {
        moveCell(x, y, x, y + 1)
        return;
    } else {
        if(simAcid(x, y + 1)) {
            return;
        }
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

    simAcid(x, y);

    increaseInactive(x, y);
}

function simAcid(x, y) {
    var d = [0,  11, 12, 9, 5]

    if(d.indexOf(getCellMaterial(x, y + 1)) == -1 && getCellMaterial(x, y + 1) != undefined) {
        clearCell(x, y);
        clearCell(x, y + 1);
        return true;
    }

    if(!isCellEmpty(x + 1, y) && d.indexOf(getCellMaterial(x + 1, y)) == -1 && getCellMaterial(x + 1, y) != undefined) {
        clearCell(x, y);
        clearCell(x + 1, y);
        return true;
    }

    if(!isCellEmpty(x - 1, y) && d.indexOf(getCellMaterial(x - 1, y)) == -1 && getCellMaterial(x - 1, y) != undefined) {
        clearCell(x, y);
        clearCell(x - 1, y);
        return true;
    }

    if(d.indexOf(getCellMaterial(x, y - 1)) == -1 && getCellMaterial(x, y - 1) != undefined) {
        clearCell(x, y);
        clearCell(x, y - 1);
        return true;
    }

    return false;
}