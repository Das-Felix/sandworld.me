
var brushSize = 4;
var brushMode = 1;
var mouseDown = false;

var mouseX = 0;
var mouseY = 0;

var lastMouseLoc = {
    x: 0,
    y: 0,
    clock: 0,
}

const ongoingTouches = [];

var inputController = document.getElementById("input-controller");

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

function paint(x, y, size, mat) {
    if(size == 1) {
        createCell(x, y, mat);
        return;
    }

    midX = x - 0.5;
    midY = y - 0.5;

    if(brushMode == 0) {
        for(var i = x-size/2;i < x+size/2; i++) {
            for(var j = y-size/2;j < y+size/2; j++) {
                createCell(i, j, mat);
            }
        }
        return;
    }

    for(var i = x-size/2;i < x+size/2; i++) {
        for(var j = y-size/2;j < y+size/2; j++) {
            var a = difference(midX, i);
            var b = difference(midY, j);

            var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

            if(distance <= (size / 2)) {
                createCell(i, j, mat);
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
        smooth();
        paint(mouseX, mouseY, brushSize);
    }

    
}, 100);

inputController.addEventListener("mousedown", (event) => {
    saveSnapshot();
    mouseDown = true;

    const boundingRect = inputController.getBoundingClientRect();

    var loc = calculateInputLocation(event, boundingRect);


    paint(loc.x, loc.y, brushSize);    
});

inputController.addEventListener("mousemove", (event) => {
    const boundingRect = inputController.getBoundingClientRect();

    var loc = calculateInputLocation(event, boundingRect);

    lastMouseLoc.x = mouseX;
    lastMouseLoc.y = mouseY;
    lastMouseLoc.clock = simulationFrame;

    mouseX = loc.x;
    mouseY = loc.y;


    if(mouseDown) {
        smooth();
        paint(mouseX, mouseY, brushSize);
    }
       
});

window.addEventListener("mouseup", (event) => {
    mouseDown = false;
})


//Touch Events

inputController.addEventListener('touchstart', (event) => {
    event.preventDefault();

    const boundingRect = canvas.getBoundingClientRect();

    var loc = calculateInputLocation(event, boundingRect);



    paint(loc.x, loc.y, brushSize);

});


inputController.addEventListener('touchend', (event) => {
    event.preventDefault();
});


inputController.addEventListener('touchmove', (event) => {

    if(display) {
        resetResetCountdown();
    }

    const boundingRect = canvas.getBoundingClientRect();

    event.preventDefault();

    Array.from(event.touches).forEach(touch => {

        var loc = calculateInputLocation(touch, boundingRect);

        lastMouseLoc.x = mouseX;
        lastMouseLoc.y = mouseY;
        lastMouseLoc.clock = simulationFrame;

        mouseX = loc.x;
        mouseY = loc.y;

        //smooth();
        paint(mouseX, mouseY, brushSize);
    })
});

function smooth() {
    var lastMouseX = lastMouseLoc.x;
    var lastMouseY = lastMouseLoc.y;

    if(lastMouseLoc.clock < (simulationFrame - 10)) {
        return;
    }

    var duration = 20;

    for(var i = 0; i < duration; i ++) {

        progress = i / duration;

        var x = Math.round(lastMouseX + (mouseX - lastMouseX) * progress);
        var y = Math.round(lastMouseY + (mouseY - lastMouseY) * progress);

        paint(x, y, brushSize);
    }
}

function calculateInputLocation(event, boundingRect) {
    const scaleX = inputController.width / boundingRect.width;
    const scaleY = inputController.height / boundingRect.height;

    const x = Math.floor((event.clientX - boundingRect.left) * scaleX + 0.5);
    const y = Math.floor((event.clientY - boundingRect.top) * scaleY + 0.5);

    return {x: x, y: y};
}



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
    document.getElementById("mat11").classList.remove("selected")
    document.getElementById("mat12").classList.remove("selected")
    document.getElementById("mat13").classList.remove("selected")
    document.getElementById("mat14").classList.remove("selected")
    document.getElementById("mat15").classList.remove("selected")
    document.getElementById("mat17").classList.remove("selected")
    document.getElementById("mat18").classList.remove("selected")
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
