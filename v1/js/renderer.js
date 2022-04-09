

function getMaterialColor(id) {
    switch(id) {
        case 2:
            return waterColors[0];
        case 7:
            return "#00000";
    }
}

var glow = 50;
var lastGlowStep = 0;
var glowDirection = -1;

var maxGlow = 50;
var minGlow = 1;

function drawGrid(grid) {

    lastGlowStep ++;

    if(lastGlowStep == 3) {
        glow = glow + glowDirection;
        lastGlowStep = 0;
    }

    if(glow >= maxGlow || glow <= minGlow) {
        glowDirection = glowDirection * -1;
    }



    const imageData = context.createImageData(200, 300);

    var index = 0;

    for(var i = 0; i < 300; i++) {
        for(var j = 0; j < 200; j++) {

            var type = grid[i][j].type;
            var r = 0;
            var g = 0;
            var b = 0;
            var a = grid[i][j].alpha;

            switch(type) {
                case 0:
                    a = 0;
                    break;
                case 1:
                    r = 220;
                    g = 167;
                    b = 110;
                    break;
                case 2:
                    r = 152;
                    g = 189;
                    b = 249;
                    a = a - glow;

                    break;
                case 3:
                    r = 98;
                    g = 98;
                    b = 98;
                    break;
                case 4:
                    r = 155;
                    g = 89;
                    b = 55;
                    break;
                case 6:
                    r = 255;
                    g = 165;
                    b = 120;
                    break;
                case 7:
                    r = 0;
                    g = 0;
                    b = 0;
                    break;
                case 9:
                    r = 88;
                    g = 255;
                    b = 160;
                    a = 255;
                    break;
                case 10:
                    r = 0;
                    g = 0;
                    b = 0;
                    break;
            }

            

            imageData.data[index + 0] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = a;

            index += 4;
        }
    }

    context.putImageData(imageData, 0, 0);
}
