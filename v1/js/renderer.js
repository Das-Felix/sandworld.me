

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



    const imageData = context.createImageData(width, height);

    var index = 0;

    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {

            var cell = grid[i][j];
            var type = cell.type;
            var data = cell.data;
            var render = true;

            if(type == 20 && cell.data != null && cell.data.mat != null) type = cell.data.mat;

            var r = 0;
            var g = 0;
            var b = 0;
            var a = cell.alpha;

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
                    r = 115;
                    g = 115;
                    b = 115;
                    break;
                case 4:
                    r = 110;
                    g = 74;
                    b = 56;
                    break;
                case 5:
                    r = 157;
                    g = 70;
                    b = 70;
                    break;
                case 6:
                    r = 255;
                    g = 100 + cell.data;
                    b = 100;
                    break;
                case 7:
                    r = 0;
                    g = 0;
                    b = 0;
                    break;
                case 8:
                    r = 70;
                    g = 6;
                    b = 0;
                    break;
                case 9:
                    r = 86;
                    g = 185;
                    b = 94;
                
                    break;
                case 10:
                    r = 0;
                    g = 0;
                    b = 0;
                    a = 255 - a;
                    break;
                case 11:
                    r = 156;
                    g = 69;
                    b = 163;
                    break;
                case 12:
                    r = 100;
                    g = 165;
                    b = 180;
                    break;
                case 13:
                    r = 245;
                    g = 182;
                    b = 197;
                    break;
                case 14:
                    r = 214;
                    g = 187;
                    b = 37;
                    break;
                case 15:
                    r = 128;
                    g = 105;
                    b = 74;
                    break;
                case 16:
                    if(data != null && data.flower) {
                        r = data.r;
                        g = data.g;
                        b = data.b;
                    } else {
                        r = 66;
                        g = 142;
                        b = 56;
                    }
                    break;
                case 17:
                    r = 214;
                    g = 95;
                    b = 51;
                    a = a - glow;
                    break;
                case 18:
                    r = 142;
                    g = 116;
                    b = 199;
                    break;
                case 44:
                    if(data != null) {
                        r = data.r;
                        g = data.g;
                        b = data.b;
                        break;
                    }

                    render = false;
                    break;

            }

            // var size = brushSize;
            // var x = mouseX;
            // var y = mouseY;

            // var midX = x - 0.5;
            // var midY = y - 0.5;

            // for(var i = x-size/2;i < x+size/2; i++) {
            //     for(var j = y-size/2;j < y+size/2; j++) {
            //         var a = difference(midX, i);
            //         var b = difference(midY, j);
        
            //         var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        
            //         if(distance <= (size / 2)) {
            //             a = a - 20;
            //         }
            //     }
            // }

            if(DEBUG) {
                if(!cell.active) a = a - 50;

                shockwaves.forEach(wave => {    
                    var dist = getDistance(j, i, wave.x, wave.y);
                    if(dist < wave.outer && dist > wave.inner) {
                        a = a + 50;
                        r = r + 100;
                    }
                });
            }
            

            if(render) {
                imageData.data[index + 0] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = a;               
            }


            index += 4;
        }
    }

    context.putImageData(imageData, 0, 0);
}
