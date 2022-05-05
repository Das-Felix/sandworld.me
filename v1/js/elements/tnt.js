function simulateTNT(x, y) {

    var random = Math.floor(Math.random() * (21 - 0 + 1)) + 1;

    var materialId = 8;

    var dir= getRandomDirection();
    var vec1 = getRandomVector();
    var vec2 = getRandomVector();

    if(isFire(x + vec1.x, y + vec1.y) || isFire(x - vec1.x, y - vec1.y) || isFire(x + vec2.x, y + vec2.y) || isFire(x - vec2.x, y - vec2.y)) {
        clearCell(x, y);
        createPixel(x, y, 6);

        if(!isCellEmpty(x, y + 1)) {
            var mat = getCellMaterial(x, y + 1);

            

        }

    }

    if(isCellEmpty(x, y + 1)) {
        if(random < 5) return;
        moveCell(x, y, x, y + 1);

        return;
    }

    if(isCellEmpty(x + dir, y + 1)) {
        moveCell(x, y, x + dir, y + 1);
        return;
    }

    //Falling into Liquid

    if(isCellLiquid(x, y + 1)) {

        swapCells(x, y, x, y + 1)
        moveSideways(x, y);

        return;
    }

    if(isCellLiquid(x + dir, y + 1)) {
        swapCells(x, y, x + dir, y + 1);
        return;
    }

    increaseInactive(x, y);

}

function moveSideways(x, y) {
    if(isCellEmpty(x - 1, y)) {
        moveCell(x, y, x - 1, y);
        return;
    }

    if(isCellEmpty(x + 1, y)) {
        moveCell(x, y, x + 1, y);
        return;
    }
}

function isFire(x, y) {
    return getCellMaterial(x, y) == 6;
}