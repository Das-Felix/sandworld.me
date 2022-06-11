function simulateSmoke(x, y) {

    var random = Math.floor(Math.random() * (20 - 0 + 1)) + 1;


    if(y == 0) {
        clearCell(x, y);
        return;
    }

    if(random == 10) {
        clearCell(x, y);
        return;
    }
    if(isCellEmpty(x, y - 1)) { 
        moveCell(x, y, x, y -1);
        y = y - 1;
    }   

    var vec = getRandomVector();

    if(isCellEmpty(x + vec.x, y + vec.y)) {
        moveCell(x, y, x + vec.x, y + vec.y);
    }
}