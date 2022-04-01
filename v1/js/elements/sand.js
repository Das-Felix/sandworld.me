var sandColors = ["#efbf77", "#e9ba74", "#f0c078", "#e3b672", "#d2a869", "#efbf77", "#e9ba74", "#f0c078", "#e3b672", "#d2a869", "#d2a869", "#d2a869"];
function simulateSand(x, y) {

    var materialId = 1;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random <= 2) {
        return;
    }

    if(isCellEmtpy(x, y + 1)) {
        clearCell(x, y);
        setCell(x, y + 1, materialId, sandColors[random]);
        increaseMovedPixels();
        return;
    }

    if(isCellEmtpy(x + 1, y + 1) && isCellEmtpy(x - 1, y +1)) {

        if(random > 5) {
            clearCell(x, y);
            setCell(x + 1, y + 1, materialId, sandColors[random]);
        }  else {
            clearCell(x, y);
            setCell(x - 1, y + 1, materialId, sandColors[random]);
        }
        return;
    }

    if(isCellEmtpy(x + 1, y + 1)) {
        clearCell(x, y);
        setCell(x + 1, y + 1, materialId, sandColors[random]);
        return;
    }

    if(isCellEmtpy(x - 1, y + 1)) {
        clearCell(x, y);
        setCell(x - 1, y + 1, materialId, sandColors[random]);
        return;
    }

    //Falling into Liquid

    if(isCellLiquid(x, y + 1)) {
        clearCell(x, y);

        if(getCellMaterial(x, y + 1) == 7) {
            moveParticleToClosestEmptySpot(x, y, 7, "#00000");
        } else {
            moveParticleToClosestEmptySpot(x, y, 2, waterColors[random]);
        }

        
        setCell(x, y + 1, materialId, sandColors[random]);
        return;
    }

    if(isCellLiquid(x + 1, y + 1) && isCellLiquid(x - 1, y +1)) {

        if(random > 5) {
            clearCell(x, y);
            moveParticleToClosestEmptySpot(x, y, 2, waterColors[random]);
            setCell(x + 1, y + 1, materialId, sandColors[random]);
        }  else {
            clearCell(x, y);
            moveParticleToClosestEmptySpot(x, y, 2, waterColors[random]);
            setCell(x - 1, y + 1, materialId, sandColors[random]);
        }
        return;
    }


    if(isCellLiquid(x + 1, y + 1)) {
        clearCell(x, y);
        moveParticleToClosestEmptySpot(x, y, 2, waterColors[random]);
        
        setCell(x + 1, y + 1, materialId, sandColors[random]);
        return;
    }

    if(isCellLiquid(x - 1, y + 1)) {
        clearCell(x, y);
        moveParticleToClosestEmptySpot(x, y, 2, waterColors[random]);
        setCell(x - 1, y + 1, materialId, sandColors[random]);
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