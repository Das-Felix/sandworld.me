function simulateLava(x, y) {

    var random = Math.floor(Math.random() * (1000 - 0 + 1)) + 1;


    if(random == 56 && isCellEmpty(x, y - 1)) {
        createCell(x, y - 1, 6);
    }

    var dir = getRandomDirection();

    if(isCellEmpty(x, y + 1) || getCellMaterial(x, y + 1) == 10) {
        moveCell(x, y, x, y + 1);
        return;
    }


    if(isCellEmpty(x + dir, y) || getCellMaterial(x + dir, y) == 10) {
        moveCell(x, y, x + dir, y);
        return;
    }

}