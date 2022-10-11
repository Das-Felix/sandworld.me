function simulateLava(x, y) {

    var random = Math.floor(Math.random() * (1000 - 0 + 1)) + 1;

    var stoneVectors = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}]
    stoneVectors.forEach(v => {
        if(getCellMaterial(x + v.x, y + v.y) == 2) {
            clearCell(x, y);
            createCell(x, y, 3);
            return;
        }
    });


    if(random == 56 && isCellEmpty(x, y - 1)) {
        createCell(x, y - 1, 6);
    }

    if(isCellEmpty(x, y + 1) || getCellMaterial(x, y + 1) == 10) {
        moveCell(x, y, x, y + 1);
        return;
    }

    var dir = getRandomDirection();


    if((isCellEmpty(x + dir, y) || getCellMaterial(x + dir, y) == 10) && random > 600) {
        moveCell(x, y, x + dir, y);
        return;
    }

    increaseInactive(x, y);

}