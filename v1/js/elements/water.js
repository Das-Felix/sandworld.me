function simulateWater(x, y) {

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(isCellEmpty(x, y + 1) || getCellMaterial(x, y + 1) == 6) {
        moveCell(x, y, x, y + 1)
        return;
    }

    if(random == 10) {
        return;
    }


    var data = grid[y][x].data;
    var dir;

    if(data == null || data.dir == null) {
        dir = getRandomDirection();
        grid[y][x].data = {
            dir: dir,
        }
    } else {
        dir = data.dir;
    }

    if(isCellEmpty(x + dir, y)) {
        moveCell(x, y, x + dir, y)
        return;
    } else {
        grid[y][x].data.dir = dir * -1;
    }


    if(getCellMaterial(x, y + 1) == 7) {
        swapCells(x, y, x, y + 1);
        return;
    }

    if(getCellMaterial(x + dir, y) == 7) {
        swapCells(x, y, x + dir, y);
        return;
    }

    increaseInactive(x, y);
}   