var waterColors = ["#0964f7", "#4D7CC2", "#568AD8", "#4D7BC0", "#5080C8", "#5487D3", "#5588D4", "#5182CC", "#5080C9", "#4975B6", "#5C93E6", "#5384CF"];

function simulateWater(x, y) {

    var materialId = 2;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(isCellEmtpy(x, y + 1)) {
        clearCell(x, y);
        setCell(x, y + 1, materialId, waterColors[random]);
        return;
    }

    if(isCellEmtpy(x + 1, y) && isCellEmtpy(x - 1, y)) {

        if(random > 5) {
            clearCell(x, y);
            setCell(x + 1, y, materialId, waterColors[random]);
        }  else {
            clearCell(x, y);
            setCell(x - 1, y, materialId, waterColors[random]);
        }
        return;
    }

    if(random >= 8) return;

    if(isCellEmtpy(x + 1, y)) {
        clearCell(x, y);
        setCell(x + 1, y, materialId, waterColors[random]);
        return;
    }

    if(isCellEmtpy(x - 1, y)) {
        clearCell(x, y);
        setCell(x - 1, y, materialId, waterColors[random]);
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