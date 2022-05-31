function simulateGas(x, y) {

    if(shockwaves.length > 0) {
        for(var i = 0; i < shockwaves.length; i++) {
            var wave = shockwaves[i];
            var dist = getDistance(x, y, wave.x, wave.y);

            if(dist <= wave.outer || dist > wave.inner) {

                clearCell(x, y);
                createCell(x, y, 6);

                if(getCellMaterial(x, y + 1) != null && getCellMaterial(x, y + 1) != 0 && getCellMaterial(x, y + 1) != 8) {
                    throwUp(x, y + 1);
                }

                if(wave.strength < 100) {
                    shockwaves[i].strength = wave.strength + 0.2;
                }
                return;

            }
        } 
    }

    var vec = getRandomVector();

    if(isFire(x + 1, y) || isFire(x - 1, y) || isFire(x, y + 1) || isFire(x, y - 1)) {
        clearCell(x, y);
        createCell(x, y, 6)

        createShockwave(x, y, 3);
       return;
    }

    if(isCellEmpty(x + vec.x, y + vec.y)) {
        moveCell(x, y, x + vec.x, y + vec.y);
    }

}