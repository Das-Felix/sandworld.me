function simulateSand(x, y) {

    var random = Math.floor(Math.random() * (21 - 0 + 1)) + 1;

    var materialId = 1;

    var dir= getRandomDirection();

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

