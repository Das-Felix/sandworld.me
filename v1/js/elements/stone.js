function simulateStone(x, y) {
    
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