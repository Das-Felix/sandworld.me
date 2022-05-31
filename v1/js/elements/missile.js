function simulateMissile(x, y) {

    var d = grid[y][x].data;

    var dir = getRandomDirection();

    if(d == null || d.mat == null) {
        //Initializing Missile Data

        var lifetime = Math.floor(Math.random() * (120 - 0 + 45)) + 1;

        
        grid[y][x].data = {
            mat: 0,
            life: lifetime,
            dirX: dir,
            dirY: -1,
        }

        return;
    }

    if(d.mat == 0 || d.mat == 14) {
        //Setting Rocket Material otherwise fall down like Sand

        if(getCellMaterial(x, y - 1) != 0 && getCellMaterial(x, y - 1) != 14 && getCellMaterial(x, y - 1) != null)  {
            var mat = getCellMaterial(x, y - 1)
            clearCell(x, y);
            createCell(x, y, mat);
            return;
        }

        if(getCellMaterial(x + dir, y) != 0 && getCellMaterial(x + dir, y) != 14 && getCellMaterial(x + dir, y) != null)  {
            var mat = getCellMaterial(x + dir, y)
            clearCell(x, y);
            createCell(x + dir, y, mat);
            return;
        }

        var m1 = getCellMaterial(x, y + 1);
        var m2 = getCellMaterial(x + 1, y);
        var m3 = getCellMaterial(x - 1, y);

        if(m1 != 0 && m1 != 14 && m1 != null) {
            return grid[y][x].data.mat = m1;
        }
        if(m2 != 0 && m2 != 14 && m2 != null) {
            return grid[y][x].data.mat = m2;
        }
        if(m3 != 0 && m3 != 14 && m3 != null) {
            return grid[y][x].data.mat = m3;
        }

        if(isCellEmpty(x, y + 1)) {
            return moveCell(x, y, x, y + 1);
        }

        if(isCellEmpty(x + dir, y + 1)) {
            return moveCell(x, y, x + dir, y + 1);
        }


        return;
    }

    if(d.life <= 0) return clearCell(x, y);

    grid[y][x].data.life = d.life - 1;

    var dirX = d.dirX;
    var dirY = d.dirY;
    
    var r = Math.floor(Math.random() * (100 - 0 + 0)) + 1;

    //if(r < 30) dirX = 0;

    if(r > 90) dirY = dirY * -1;
    if(r > 60) dirX = dirX * -1;

    if(isCellEmpty(x + dirX, y + dirY)) {
        moveCell(x, y, x + dirX, y + dirY);
        if(r > 20) createCell(x, y, d.mat);
    } 

    grid[y][x].dirX = dirX;
    grid[y][x].dirY = dirY;
 
    
}