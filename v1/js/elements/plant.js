var flowerColors = [
    {r: 224, g: 225, b: 64},
    {r: 191, g: 104, b: 98},
    {r: 80, g: 165, b: 196},
    {r: 245, g: 169, b: 80},
    {r: 245, g: 93, b: 80},
]

function simulatePlant(x, y) {
    var data = grid[y][x].data;

    if(!data) {
        grid[y][x].data = {
            flower: false,
            grow: 10,
            r: 0,
            g: 0,
            b: 0
        }

        var dir = getRandomDirection();
        if(isCellEmpty(x + dir, y)) {
            moveCell(x, y, x + dir, y);
        } else if(isCellEmpty(x - dir, y)) {
            moveCell(x, y, x - dir, y);
        } else if(isCellEmpty(x, y - 1)) {
            moveCell(x, y, x, y - 1);
        }

        return;
    }

    if(getCellMaterial(x, y - 1) != null && getCellMaterial(x, y -1) == 2) {
        grid[y][x].data.grow = 3;
        grid[y][x].data.flower = false;
        clearCell(x, y - 1);
    }


    var data = grid[y][x].data;
    var grow = data.grow;
    var dir = getRandomDirection();

    var burnVectors = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}]
    burnVectors.forEach(v => {
        if(isFire(x + v.x, y + v.y)) {
            clearCell(x, y);
            createCell(x, y, 6);
            return;
        }
    });


    if(data.flower) {

        var vec = getRandomVector();

        if(grow > 0) {
            
            if(grow > 5) {
                var vectors = [{x: 1, y: -1}, {x: -1, y: 0}, {x: 0, y: -1}]
                vectors.forEach(v => {
                    createCell(x + v.x, y + v.y, 16, false, {
                        grow: grow - 4,
                        flower: true,
                        r: data.r,
                        g: data.g,
                        b: data.b
                    });
                });
            }

            if(isCellEmpty(x + vec.x, y + vec.y)) {
                createCell(x + vec.x, y + vec.y, 16, false, {
                    grow: grow - 1,
                    flower: true,
                    r: data.r,
                    g: data.g,
                    b: data.b
                });
            }

            if(grid[y][x].data != null) {
                grid[y][x].data.grow = 0;
            }


        }
        return;
    }

    if(grow > 0) {

        if(isCellEmpty(x + dir, y - 1)) {

            var flower = grow == 1; 

            var newGrow = grow - 1;
            var flowerColor = { r: 0, g: 0, b: 0};


            if(flower) {
                newGrow = 10;
                flowerColorIndex = Math.floor(Math.random() * ((flowerColors.length - 1) - 0 + 1));
                flowerColor = flowerColors[flowerColorIndex];
            }

            createCell(x + dir, y - 1, 16, false, {
                grow: newGrow,
                flower: flower,
                r: flowerColor.r,
                g: flowerColor.g,
                b: flowerColor.b,
            });
        }

        if(grid[y][x].data != null) {
            grid[y][x].data.grow = 0;
        }
    }

    increaseInactive(x, y);

}