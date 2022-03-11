var fireColors = ["#ff4616", "#ff2414", "#ff7214", "#ff5214", "#ff1414", "#ff3914", "#ff6414", "#ff7214", "#ff6500", "#d80000", "#ff6900"];

function simulateFire(x, y) {

    var dontMove = [];

    var materialId = 6;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;
    var burn = Math.floor(Math.random() * (100 - 0 + 1)) + 1;

    if(isCellEmtpy(x, y - 2)) {
        if(burn > 50) {
            setCell(x, y - 2, 10, smokeColors[random]);
        }
    }

    if(isCellFlamable(x, y - 1)) {
        setCell(x, y, materialId, fireColors[random]);

        if(burn > 98) {
            setCell(x, y - 1, materialId, fireColors[random]);
        }
        return;
    }

    if(isCellFlamable(x, y + 1)) {
        setCell(x, y, materialId, fireColors[random]);


        if(burn > 98) {
            setCell(x, y + 1, materialId, fireColors[random]); 
        }
        return;
    }

    if(isCellFlamable(x - 1, y)) {
        setCell(x, y, materialId, fireColors[random]);


        if(burn > 98) {
            setCell(x - 1, y, materialId, fireColors[random]);
            
        }
        return;
    }

    if(isCellFlamable(x + 1, y)) {
        setCell(x, y, materialId, fireColors[random]);


        if(burn > 98) {
            setCell(x + 1, y, materialId, fireColors[random]);
        }
        return;
    }

    if(isCellEmtpy(x, y-1)) {
        if(burn > 70) {
            clearCell(x, y);
            setCell(x, y - 1, materialId, fireColors[random]);
        }
    }

    if(burn >= 100)  {
        clearCell(x, y);
    }

}