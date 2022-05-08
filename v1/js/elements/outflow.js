function simulateOutflow(x, y) {

    var vectors = [
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1}
    ]

    vectors.forEach(v => {
        var mat = getCellMaterial(x + v.x, y + v.y);
        if(mat != 0 && mat != 12) {
            clearCell(x + v.x, y + v.y);
        }
    })
}