var acidColors = ["#9cfca2", "#9cfca2", "#9cfca2", "#9cfca2","#9cfca2","#9cfca2","#9cfca2","#9cfca2","#9cfca2","#9cfca2","#9cfca2","#9cfca2","#9cfca2","#9cfca2",];

function simulateAcid(x, y) {

    var materialId = 9;

    var random = Math.floor(Math.random() * (4 - 0 + 1)) + 1;
    var burn = Math.floor(Math.random() * (100 - 0 + 1)) + 1;

    if(isCellEmtpy(x, y + 1)) {
        clearCell(x, y);
        setCell(x, y + 1, materialId, acidColors[random]);
        return;
    }

    if(burn > 80) {

        if(random == 3) {
            clearCell(x, y);
            setCell(x + 1, y, materialId, acidColors[random]);
            return;
        }

        if(random <= 2) {
            clearCell(x, y);
            setCell(x - 1, y, materialId, acidColors[random]);
            return;
        }

        clearCell(x, y);
        setCell(x, y + 1, materialId, acidColors[random]);
        return;

    }

}