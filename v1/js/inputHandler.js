
var brushSize = 4;
var mouseDown = false;

var mouseX = 0;
var mouseY = 0;

canvas.addEventListener("mousedown", (event) => {

    mouseDown = true;

    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / Math.ceil(window.devicePixelRatio) / boundingRect.width;
    const scaleY = canvas.height / Math.ceil(window.devicePixelRatio) / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const realX = Math.min(Math.floor(canvasLeft), width - 1);
    const realY = Math.min(Math.floor(canvasTop), height - 1);
    
    const x = Math.round(realX / pixelSize, 0);
    const y = Math.round(realY / pixelSize, 0);


    for(var i = x-brushSize/2;i < x+brushSize/2; i++) {
        for(var j = y-brushSize/2;j < y+brushSize/2; j++) {
            createPixel(i, j);
        }
    }

    
});

canvas.addEventListener("mousemove", (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / Math.ceil(window.devicePixelRatio) / boundingRect.width;
    const scaleY = canvas.height / Math.ceil(window.devicePixelRatio) / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const realX = Math.min(Math.floor(canvasLeft), width - 1);
    const realY = Math.min(Math.floor(canvasTop), height - 1);
    
    const x = Math.round(realX / pixelSize, 0);
    const y = Math.round(realY / pixelSize, 0);


    if(mouseDown) {
        for(var i = x-brushSize/2;i < x+brushSize/2; i++) {
            for(var j = y-brushSize/2;j < y+brushSize/2; j++) {
                createPixel(i, j);
            }
        }
    }
       
});

canvas.addEventListener("mouseup", (event) => {
    mouseDown = false;
})

function setMaterial(id) {

    clearSelected();
    document.getElementById("mat" + id).classList.add("selected")
    setMat(id);
}

function clearSelected() {

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
