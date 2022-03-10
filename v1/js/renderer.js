var pixelSize = getPixelSize();

function drawPixel(x, y, color) {
    context.fillStyle = color || "#e0988d";
  	context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
}

function clearPixel(x, y) {
    context.clearRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
}