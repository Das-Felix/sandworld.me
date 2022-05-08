function simulateTNT(x, y) {

    var random = Math.floor(Math.random() * (21 - 0 + 1)) + 1;

    var materialId = 8;

    var dir= getRandomDirection();
    // var vec1 = getRandomVector();
    // var vec2 = getRandomVector();

    if(isFire(x + 1, y) || isFire(x - 1, y) || isFire(x, y + 1) || isFire(x, y - 1)) {
        clearCell(x, y);
        createCell(x, y, 6);

        clearCell(x + 1, y);
        createCell(x + 1, y, 6);

        clearCell(x - 1, y);
        createCell(x - 1, y, 6);

        var m1 = getCellMaterial(x + 1, y);
        var m2 = getCellMaterial(x - 1, y);
        var m3 = getCellMaterial(x, y + 1);
        var m4 = getCellMaterial(x, y - 1);
        var fM = [0, 8, 6, 10, 20];

        if(!isCellEmpty(x, y + 1) && random < 5 && y < height - 1) {
            //throwUp(x, y + 1);
        } 

        if(fM.indexOf(m1) == -1 || fM.indexOf(m2) == -1 || fM.indexOf(m3) == -1 || fM.indexOf(m4) == -1) {

            var strength = random;

            if(strength < 10) strength = 15;

            var createWave = true;

            // shockwaves.forEach(wave => {
            //     if(getDistance(x, y, wave.x, wave.y) < wave) {
            //         createWave = false;
            //     }
            // });

            if(shockwaves.length < 2) {
                createShockwave(x, y, strength);
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