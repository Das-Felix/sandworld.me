var sandColors = ["#efbf77", "#e9ba74", "#f0c078", "#e3b672", "#d2a869", "#efbf77", "#e9ba74", "#f0c078", "#e3b672", "#d2a869", "#d2a869", "#d2a869"];
function simulateSand(x, y) {

    var materialId = 1;

    
    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random == 9) {
        return;
    }

    if(isCellEmpty(x, y + 1)) {
        moveCell(x, y, x, y + 1);
        return;
    }

    if(isCellEmpty(x + 1, y + 1) && isCellEmpty(x - 1, y +1)) {
        if(random > 5) {
            moveCell(x, y, x + 1, y + 1);
        }  else {
            moveCell(x, y, x - 1, y + 1);
        }
        return;
    }

    if(isCellEmpty(x + 1, y + 1)) {
        moveCell(x, y, x + 1, y + 1);
        return;
    }

    if(isCellEmpty(x - 1, y + 1)) {
        moveCell(x, y, x - 1, y + 1);
        return;
    }

    //Falling into Liquid

    if(isCellLiquid(x, y + 1)) {

        swapCells(x, y, x, y + 1)

        return;
    }

    if(isCellLiquid(x + 1, y) && isCellLiquid(x - 1, y +1)) {

        if(random > 5) {
            swapCells(x, y, x + 1, y + 1);
        }  else {
            swapCells(x - 1, y, x + 1, y + 1);
        }
        return;
    }


    if(isCellLiquid(x + 1, y + 1)) {
        swapCells(x, y, x + 1, y + 1);
        return;
    }

    if(isCellLiquid(x - 1, y + 1)) {
        swapCells(x, y, x - 1, y + 1);
        return;
    }

    increaseInactive(x, y);

}