var stoneColors = ["#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A", "#9A9A9A"];

function simulateStone(x, y) {

    var materialId = 3;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(isCellEmtpy(x, y + 1)) {
        clearCell(x, y);
        setCell(x, y + 1, materialId, stoneColors[random]);
        return;
    }


    //Falling into Liquid

    if(isCellLiquid(x, y + 1)) {
        moveParticleToClosestEmptySpot(x, y, 2, waterColors[random]);
        clearCell(x, y);
        setCell(x, y + 1, materialId, stoneColors[random]);
        return;
    }

}

function moveParticleToClosestEmptySpot(x, y, material, color) {
    if(isCellEmtpy(x + 1, y)) {
        setCell(x + 1, y, material, color);
    } else if(isCellEmtpy(x - 1, y)) {
        setCell(x - 1, y, material, color);
    } else if(isCellEmtpy(x - 1, y + 1)) {
        setCell(x - 1, y + 1, material, color);
    } else if(isCellEmtpy(x + 1, y + 1)) {
        setCell(x + 1, y + 1, material, color);
    } else {
        setCell(x, y, material, color);
    }
}