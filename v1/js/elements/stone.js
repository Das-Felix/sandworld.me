function simulateStone(x, y) {

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random <= 2) {
        return;
    }

    if(isCellEmpty(x, y + 1)) {
        moveCell(x, y, x, y + 1)
        return;
    }


    //Falling into Liquid

    if(isCellLiquid(x, y + 1)) {
        swapCells(x, y, x, y + 1)
        return;
    }

    increaseInactive(x, y);

}