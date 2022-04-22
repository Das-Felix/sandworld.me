var oilColors = ["#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000", "#00000"];

function simulateOil(x, y) {

    var materialId = 7;

    var random = Math.floor(Math.random() * (10 - 0 + 1)) + 1;

    if(isCellEmpty(x, y + 1)) {
        clearCell(x, y);
        setCell(x, y + 1, materialId, "#000000");
        return;
    }

    if(isCellEmpty(x + 1, y) && isCellEmpty(x - 1, y)) {

        if(random > 5) {
            clearCell(x, y);
            setCell(x + 1, y, materialId, "#000000");
        }  else {
            clearCell(x, y);
            setCell(x - 1, y, materialId, "#000000");
        }
        return;
    }

    if(random >= 8) return;

    if(isCellEmpty(x + 1, y)) {
        clearCell(x, y);
        setCell(x + 1, y, materialId, "#000000");
        return;
    }

    if(isCellEmpty(x - 1, y)) {
        clearCell(x, y);
        setCell(x - 1, y, materialId, "#000000");
        return;
    }
}