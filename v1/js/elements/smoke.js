var smokeColors = ["#c9cacc", "#c6c6c6", "#d9dadb","#c9cacc", "#c6c6c6", "#8a8b8c","#c9cacc", "#8a8b8c", "#d9dadb","#c9cacc", "#c6c6c6", "#d9dadb","#c9cacc", "#c6c6c6", "#d9dadb"];

function simulateSmoke(x, y) {

    var materialId = 10;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(isCellEmpty(x, y-2)) {
        if(random > 8) {
            moveCell(x, y, x, y-2)
            return;
        }
    }

    if(random >= 8)  {
        clearCell(x, y);
    }

}