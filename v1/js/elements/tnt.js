function simulateTNT(x, y) {

    var random = Math.floor(Math.random() * (21 - 0 + 1)) + 1;

    var materialId = 8;

    var dir= getRandomDirection();
    // var vec1 = getRandomVector();
    // var vec2 = getRandomVector();


    if(shockwaves.length > 0) {
        for(var i = 0; i < shockwaves.length; i++) {
            var wave = shockwaves[i];
            var dist = getDistance(x, y, wave.x, wave.y);

            if(dist <= wave.outer || dist > wave.inner) {

                clearCell(x, y);
                createCell(x, y, 6);

                if(getCellMaterial(x, y + 1) != null && getCellMaterial(x, y + 1) != 0 && getCellMaterial(x, y + 1) != 8) {
                    console.log("throw")
                    throwUp(x, y + 1);
                }

                if(wave.strength < 100) {
                    shockwaves[i].strength = wave.strength + 0.2;
                }
                return;

            }
        } 
    }

    if(isFire(x + 1, y) || isFire(x - 1, y) || isFire(x, y + 1) || isFire(x, y - 1)) {

        if(shockwaves.length < 2) {
            clearCell(x, y);
            createShockwave(x, y, random * 2);
            return; 
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