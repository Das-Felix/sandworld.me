var INFLOW_RATE = 300;

function simulateInflow(x, y) {

    
    var data = grid[y][x].data;

    if(data == 0 || data == null) {
        data = {
            mat: 0,
            last: 0,
        }
    }

    var vectors = [
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1}
    ]

    //Setting inflow Material
    if(data.mat == 0) {
        vectors.forEach(v => {

            if(x + v.x > width || x + v.x < 0 || y + v.y > height || y + v.y < 0) return;

            var mat = getCellMaterial(x + v.x, y + v.y);
            if(mat != 0 && mat != 11) {
                data.mat = mat;
                data.last = INFLOW_RATE - 1;
            }
        })
    }

    data.last = data.last + 1;

    if(data.mat != 0 && data.mat != 11) {
        if(data.last >= INFLOW_RATE) {
            vectors.forEach(v => {
                var mat = getCellMaterial(x + v.x, y + v.y);
                if(mat == 0) {
                    createCell(x + v.x, y + v.y, data.mat);
                }            
            });
        }
    }




    grid[y][x].data = data;
}