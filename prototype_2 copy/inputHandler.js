
var paintSize = 12;
var mouseDown = false;

var mouseX = 0;
var mouseY = 0;


setInterval(() => {

    paintSize = document.getElementById("brushsize").value;
    
    if(mouseDown) {
        var x = mouseX;
        var y = mouseY;

        for(var i = x-paintSize/2;i < x+paintSize/2; i++) {
            for(var j = y-paintSize/2;j < y+paintSize/2; j++) {
                createPixel(i, j);
            }
        }
    }
    
}, 50);


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

    mouseX = x;
    mouseY = y;
});

canvas.addEventListener("mouseup", (event) => {
    mouseDown = false;
})

function setMaterial(id) {

    clearSelected();
    document.getElementById("mat" + id).classList.add("selected")


    currentMaterial = id;
}

function clearSelected() {

    //Todo: Replace with for Loop

    document.getElementById("mat0").classList.remove("selected")
    document.getElementById("mat1").classList.remove("selected")
    document.getElementById("mat2").classList.remove("selected")
    document.getElementById("mat3").classList.remove("selected")
    document.getElementById("mat4").classList.remove("selected")
}






//Touch SUPPOrt


canvas.addEventListener("touchstart", (event) => {

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

    for(var i = x-paintSize/2;i < x+paintSize/2; i++) {
        for(var j = y-paintSize/2;j < y+paintSize/2; j++) {

            var a = x - x;
            var b = i - j;

            var c = Math.sqrt( a*a + b*b );

            if(c < (paintSize / 2)) {
                createPixel(i, j);
            } 
        }
    }
});

canvas.addEventListener("touchmove", (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / Math.ceil(window.devicePixelRatio) / boundingRect.width;
    const scaleY = canvas.height / Math.ceil(window.devicePixelRatio) / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const realX = Math.min(Math.floor(canvasLeft), width - 1);
    const realY = Math.min(Math.floor(canvasTop), height - 1);
    
    const x = Math.round(realX / pixelSize, 0);
    const y = Math.round(realY / pixelSize, 0);

    mouseX = x;
    mouseY = y;
});

canvas.addEventListener("touchend", (event) => {
    mouseDown = false;
})
