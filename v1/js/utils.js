//Utils
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var difference = function (a, b) { return Math.abs(a - b); }

function getDistance(x, y, x1, y1) {
    var a = difference(x, x1);
    var b = difference(y, y1);

    var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return distance;
}

function getRandomDirection() {
    var random = Math.floor(Math.random() * (1000 - 0 + 1)) + 1;
    
    if(random % 2 == 0) {
        return -1;
    } else {
        return 1;
    }
}

function getRandomVector() {
    var random = Math.floor(Math.random() * (2000 - 0 + 1)) + 1;
    
    var dirX = 0, dirY = 0;

    switch(random % 9) {
        case 0:
            dirX = 1;
            dirY = 1;
            break;
        case 1:
            dirX = 1;
            dirY = 0;
            break;
        case 2:
            dirX = 1;
            dirY = -1;
            break;
        case 3:
            dirX = 0;
            dirY = -1;
            break;
        case 4:
            dirX = -1;
            dirY = -1;
            break;
        case 5:
            dirX = -1;
            dirY = 0;
            break;
        case 6:
            dirX = -1;
            dirY = 1;
            break;
        case 7:
            dirX = 0;
            dirY = 1;  
            break;
        default:
            dirX = 0;
            dirY = 0;
            break;
    }

    return {
        x: dirX,
        y: dirY,
    }
}

function moveAway(x, y, x1, y1) {
    var dirX = 1;
    var dirY = 1;

    if(x < x1) {
        dirX = 1;
    } else {
        dirX = -1;
    }
    
    if(y < y1) {
        dirY = 1;
    } else {
        dirY = -1;
    }

    if(isCellEmpty(x1 + dirX, y1 + dirY)) {
        moveCell(x1, y1, x1 + dirX, y1 + dirY);
        return {
            x: x1 + dirX,
            y: y1 + dirY
        }
    }

    if(isCellEmpty(x1 + dirX, y1)) {
        moveCell(x1, y1, x1 + dirX, y1);
        return {
            x: x1 + dirX,
            y: y1
        }
    }

    // if(getCellMaterial(x1 + dirX, y1 + dirY) == 0 || getCellMaterial(x1 + dirX, y1 + dirY) == 10 || getCellMaterial(x1 + dirX, y1 + dirY) == 6) {
    //     moveCell(x1, y1, x1 + dirX, y1 + dirY);
    //     return {
    //         x: x1 + dirX,
    //         y: y1 + dirY
    //     }
    // }

    // if(getCellMaterial(x1 + dirX, y1 - dirY) == 0 || getCellMaterial(x1 + dirX, y1 - dirY) == 10 || getCellMaterial(x1 + dirX, y1 - dirY) == 6) {
    //     moveCell(x1, y1, x1 + dirX, y1 - dirY);
    //     return {
    //         x: x1 + dirX,
    //         y: y1 - dirY
    //     }
    // }
    
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