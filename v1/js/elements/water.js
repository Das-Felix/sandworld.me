function simulateWater(x, y) {

    var materialId = 2;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random == 10) return;

    if(isCellEmtpy(x, y + 1)) {
        moveCell(x, y, x, y + 1)
        return;
    }

    

    if(isCellEmtpy(x + 1, y)) {
        moveCell(x, y, x + 1, y)
        return;
    }

    if(isCellEmtpy(x - 1, y)) {
        if(random > 5) return;
        moveCell(x, y, x - 1, y);
        return;
    }

    /*if(isCellEmtpy(x + 1, y + 1)) {
        clearCell(x, y);
        setCell(x + 1, y + 1, materialId, waterColors[random]);
        return;
    }

    if(isCellEmtpy(x - 1, y + 1)) {
        clearCell(x, y);
        setCell(x - 1, y + 1, materialId, waterColors[random]);
        return;
    }*/


}