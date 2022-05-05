//Utils
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var difference = function (a, b) { return Math.abs(a - b); }

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

function getClosestEmtpySpot(x, y) {
    var dir = getRandomDirection();

    
}