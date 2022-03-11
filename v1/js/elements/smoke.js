var smokeColors = ["#555556", "#4f4f4f", "#2b2b2b", "#707070", "#555556", "#4f4f4f", "#2b2b2b", "#707070", "#555556", "#4f4f4f", "#2b2b2b", "#707070"];

function simulateSmoke(x, y) {

    var materialId = 10;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(isCellEmtpy(x, y-2)) {
        if(random > 7) {
            clearCell(x, y);
            setCell(x, y - 2, materialId, smokeColors[random]);
            return;
        }
    }

    if(random >= 8)  {
        clearCell(x, y);
    }

}