var pixelSize = getPixelSize();

function drawPixel(x, y, color) {
    context.fillStyle = color || "#e0988d";
  	context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
}

function clearPixel(x, y) {
    context.clearRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
}

function getMaterialColor(id) {
    switch(id) {
        case 2:
            return waterColors[0];
        case 7:
            return "#00000";
    }
}