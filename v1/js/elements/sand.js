function simulateSand(x, y) {

    var materialId = 1;

    
    var random = Math.floor(Math.random() * (11 - 0 + 1)) + 1;

    if(random > 10) {
        return;
    }

    if(isCellEmpty(x, y + 1)) {
        moveCell(x, y, x, y + 1);
        return;
    }

    if(isCellEmpty(x + 1, y + 1) && isCellEmpty(x - 1, y +1)) {
        if(random > 7) {
            moveCell(x, y, x + 1, y + 1);
        }  else {
            moveCell(x, y, x - 1, y + 1);
        }
        return;
    }

    if(isCellEmpty(x - 1, y + 1)) {
        moveCell(x, y, x - 1, y + 1);
        return;
    }
    
    if(isCellEmpty(x + 1, y + 1)) {
        if(isCellEmpty(x - 1, y + 1) && random > 6) return;
        moveCell(x, y, x + 1, y + 1);
        return;
    }

    

    //Falling into Liquid

    if(isCellLiquid(x, y + 1)) {

        swapCells(x, y, x, y + 1)
        moveSideways(x, y);

        return;
    }

    if(isCellLiquid(x + 1, y) && isCellLiquid(x - 1, y +1)) {

        if(random > 5) {
            swapCells(x, y, x + 1, y + 1);
        }  else {
            swapCells(x - 1, y, x + 1, y + 1);
        }

        moveSideways(x, y);
        return;
    }


    if(isCellLiquid(x + 1, y + 1)) {
        swapCells(x, y, x + 1, y + 1);
        moveSideways(x, y);

        return;
    }

    if(isCellLiquid(x - 1, y + 1)) {
        swapCells(x, y, x - 1, y + 1);
        moveSideways(x, y);

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