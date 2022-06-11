function simulateBacteria(x, y) {

    if(grid[y][x].data == null || grid[y][x].data == 0) grid[y][x].data = false;
    
    var burnVectors = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}]
    burnVectors.forEach(v => {
        if(isFire(x + v.x, y + v.y)) {
            clearCell(x, y);
            createCell(x, y, 6);
            return;
        }
    });

    var random = Math.floor(Math.random() * (100 - 0 + 1)) + 1;

    if(isCellEmpty(x, y + 1) && random == 55) {
        createCell(x, y + 1, 18);
    }

    if(random < 90 && grid[y][x].data == false) return;

    var vec = getRandomVector();
    var mat = getCellMaterial(x + vec.x, y + vec.y);

    if(mat != null && mat != 18 && mat != 0) {
        clearCell(x + vec.x, y + vec.y);
        createCell(x + vec.x, y + vec.y, 18);
        grid[y][x].data = true;
    }

}