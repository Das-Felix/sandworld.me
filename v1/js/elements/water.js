var waterColors = ["#0964f7", "#4D7CC2", "#568AD8", "#4D7BC0", "#5080C8", "#5487D3", "#5588D4", "#5182CC", "#5080C9", "#4975B6", "#5C93E6", "#5384CF"];

function simulateWater(x, y) {

    var materialId = 2;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

<<<<<<< HEAD
    if(random <= 2) {
        return;
    }
=======
    if(random == 10) return;
>>>>>>> 5c1e1c0e80f00459364e1a53fc30c5b7e9986476

    if(isCellEmtpy(x, y + 1)) {
        clearCell(x, y);
        setCell(x, y + 1, materialId, waterColors[random]);
        return;
    }

<<<<<<< HEAD
    if(isCellEmtpy(x + 1, y) && isCellEmtpy(x - 1, y)) {

        if(random > 7) {
            clearCell(x, y);
            setCell(x + 1, y, materialId, waterColors[random]);
        }  else {
            clearCell(x, y);
            setCell(x - 1, y, materialId, waterColors[random]);
        }
        return;
    }

    if(random >= 8) return;
=======
    
>>>>>>> 5c1e1c0e80f00459364e1a53fc30c5b7e9986476

    if(isCellEmtpy(x + 1, y)) {
        clearCell(x, y);
        setCell(x + 1, y, materialId, waterColors[random]);
        return;
    }

    if(isCellEmtpy(x - 1, y)) {
        if(random > 5) return;
        clearCell(x, y);
        setCell(x - 1, y, materialId, waterColors[random]);
        return;
    }

    /*if(isCellEmtpy(x + 1, y + 1)) {
        clearCell(x, y);
        setCell(x + 1, y + 1, materialId, waterColors[random]);
        return;
    }

    if(isCellEmtpy(x - 1, y + 1)) {
        clearCell(x, y);
        setCell(x - 1, y + 1, materialId, waterColors[random]);
        return;
    }*/


}