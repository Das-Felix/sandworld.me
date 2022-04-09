
var brushSize = 4;
var brushMode = 1;
var mouseDown = false;

var mouseX = 0;
var mouseY = 0;


function  setBrushSize(size) {
    brushSize = size;
    clearSelectedBrushSize();
    document.getElementById("br" + size).classList.add("selected");

    if(brushSize == 1) return;

    if(brushSize % 2 != 0) {
        brushSize ++;
    }
}

function setBrushMode(mode) {
    clearSelectedBrushMode();
    brushMode = mode;
    document.getElementById("brm" + mode).classList.add("selected");
}

function paint(x, y) {


    if(brushSize == 1) {
        createPixel(x, y);
        return;
    }

    if(brushMode == 0) {
        for(var i = x-brushSize/2;i < x+brushSize/2; i++) {
            for(var j = y-brushSize/2;j < y+brushSize/2; j++) {
                createPixel(i, j);
            }
        }
        return;
    }

    for(var i = x-brushSize/2;i < x+brushSize/2; i++) {
        for(var j = y-brushSize/2;j < y+brushSize/2; j++) {
            var a = difference(x, i);
            var b = difference(y, j);

            var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

            if(distance <= (brushSize / 2)) {
                createPixel(i, j);
            }
        }
    }
    
}

function setMaterial(id) {

    clearSelectedColor();
    document.getElementById("mat" + id).classList.add("selected")
    setMat(id);
}

setInterval(() => {

    if(mouseDown) {
        paint(mouseX, mouseY);
    }

    
}, 100);

canvas.addEventListener("mousedown", (event) => {
    mouseDown = true;

    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / Math.ceil(window.devicePixelRatio) / boundingRect.width;
    const scaleY = canvas.height / Math.ceil(window.devicePixelRatio) / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const realX = Math.min(Math.floor(canvasLeft), width - 1);
    const realY = Math.min(Math.floor(canvasTop), height - 1);
    
    const x = Math.round(realX, 0);
    const y = Math.round(realY, 0);


    paint(mouseX, mouseY);

    
});

canvas.addEventListener("mousemove", (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / Math.ceil(window.devicePixelRatio) / boundingRect.width;
    const scaleY = canvas.height / Math.ceil(window.devicePixelRatio) / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const realX = Math.min(Math.floor(canvasLeft), width - 1);
    const realY = Math.min(Math.floor(canvasTop), height - 1);
    
    const x = Math.round(realX, 0);
    const y = Math.round(realY, 0);

    mouseX = x;
    mouseY = y;


    if(mouseDown) {
        paint(mouseX, mouseY);
    }
       
});

canvas.addEventListener("mouseup", (event) => {
    mouseDown = false;
})

function clearSelectedColor() {

    //Todo: Replace with for Loop

    document.getElementById("mat0").classList.remove("selected")
    document.getElementById("mat1").classList.remove("selected")
    document.getElementById("mat2").classList.remove("selected")
    document.getElementById("mat3").classList.remove("selected")
    document.getElementById("mat4").classList.remove("selected")
    document.getElementById("mat5").classList.remove("selected")
    document.getElementById("mat6").classList.remove("selected")
    document.getElementById("mat7").classList.remove("selected")
    document.getElementById("mat8").classList.remove("selected")
    document.getElementById("mat9").classList.remove("selected")
}

function clearSelectedBrushSize() {
    document.getElementById("br1").classList.remove("selected")
    document.getElementById("br5").classList.remove("selected")
    document.getElementById("br10").classList.remove("selected")
    document.getElementById("br20").classList.remove("selected")
}

function clearSelectedBrushMode()  {
    document.getElementById("brm0").classList.remove("selected");
    document.getElementById("brm1").classList.remove("selected");

}
