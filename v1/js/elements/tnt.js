function simulateTNT(x, y) {

    var random = Math.floor(Math.random() * (21 - 0 + 1)) + 1;

    var materialId = 8;

    var dir= getRandomDirection();
    var vec1 = getRandomVector();
    var vec2 = getRandomVector();

    if(isFire(x + vec1.x, y + vec1.y) || isFire(x - vec1.x, y - vec1.y) || isFire(x + vec2.x, y + vec2.y) || isFire(x - vec2.x, y - vec2.y)) {
        clearCell(x, y);
        createCell(x, y, 6);

        clearCell(x + vec1.x, y + vec1.y);
        createCell(x + vec1.x, y + vec1.y, 6);

        clearCell(x - vec1.x, y - vec1.y);
        createCell(x - vec1.x, y - vec1.y, 6);
        
        var bMat = getCellMaterial(x, y + 1);

        if(bMat != null && bMat != 0 && bMat != 8 && bMat != 20 && bMat != 4) {
            if(y + 1 <= 299) throwUp(x, y + 1);

            var goDown = Math.round(random);

            for(var i = 0; i < goDown; i++) {
                if(!isCellEmpty(x, y + i) && y + i <= 299) {
                    if(i % 2 == 0 || getCellMaterial(x, y + i) == 4 || getCellMaterial(x, y + i) == 5) {
                        clearCell(x, y + i);
                        moveAwaySideways(x, y, x + dir, y);

                        //Go Sideways
                        var goSideways = Math.round(random);

                        for(var j = 0; j < goSideways; j++) {
                            moveAwaySideways(x, y + 1, x + i, y);
                            moveAwaySideways(x, y + 1, x - i, y);
                        }

                    } else {
                        throwUp(x, y + i);
                    }
                }
            }
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

function throwUp(x, y) {
    var mat = getCellMaterial(x, y);

    if(mat == 20 || mat == 6 || mat==10 || mat == 0 || mat == 4 || mat == 5) return;

    clearCell(x, y);

    var newY = y;

    while(!isCellEmpty(x, newY)) {
        newY ++;
    }

    createCell(x, newY, 20, false, {
        mat: mat,
        dir: -1,
    });
}

function moveAwaySideways(x, y, x1, y1) {
    var dir = 1;

    if(x - x1 < 0) {
        dir = 1;
    } else {
        dir = -1;
    }

    if(isCellEmpty(x1 + dir, y1)) {
        moveCell(x1, y1, x1 + dir, y1)
    }
}