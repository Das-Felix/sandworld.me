function simulateWater(x, y) {

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(random == 10) return;

    if(isCellEmpty(x, y + 1)) {
        moveCell(x, y, x, y + 1)
        return;
    }

    if(isCellEmpty(x + 1, y)) {
        moveCell(x, y, x + 1, y)
        return;
    }

    if(isCellEmpty(x - 1, y)) {
        if(random > 6) return;
        moveCell(x, y, x - 1, y);
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

    increaseInactive(x, y);
}   