let camera_button = document.querySelector("#camera-button");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");

camera_button.addEventListener('click', async function() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
});

click_button.addEventListener('click', function() {

    var sCanvas = document.createElement('canvas');
    sCanvas.height = height;
    sCanvas.width = width;


    var sContext = sCanvas.getContext('2d');

            reset();
        sCanvas.getContext('2d').drawImage(video, -100, 0, 400, 300);
    
        var imageData = sContext.getImageData(0, 0, width, height);
        var data = imageData.data;
    
        console.log(data);
    
        var cellIndex = 0;
        var row = 0;
    
        for(var index = 0; index< (data.length / 4); index++) {
    
            cellIndex++;
    
            if(cellIndex == width) {
                cellIndex = 0;
                row++;
            }
    
            var i = index * 4;
    
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var a = data[i + 3];
            var l = (r + g + b) / 3;
    
            if(l > 150) {
                continue;
            }
    
            r = r + 70;
            g = g + 70;
            b = b + 20;
    
            if(r > 255) r = 255;
            if(g > 255) g = 255;
            if(b > 255) b = 255;
    
            while(l < 200) {
                l = l + 10;
            }    
    
            var type = getElementFromColor({r: r, g: g, b: b});
    
            //Check if White
    
            createCell(cellIndex, row, type)
    
            // if(r < 100 && g < 100 && b < 100) {
            //     createCell(cellIndex, row, 7);
            // } else if(r > 150 && g > 150 && b > 150) {
            //     createCell(cellIndex, row, 3);
            // } else if(r > 200) {
            //     createCell(cellIndex, row, 8);
            // } else if(b > 100) {
            //     createCell(cellIndex, row, 2);
            // } else {
            //     createCell(cellIndex, row, 1)
            // }
    
            grid[row][cellIndex].alpha = l;
    
    
        }

    // setInterval(() => {
    //     reset();
    //     sCanvas.getContext('2d').drawImage(video, -100, 0, 400, 300);
    
    //     var imageData = sContext.getImageData(0, 0, width, height);
    //     var data = imageData.data;
    
    //     console.log(data);
    
    //     var cellIndex = 0;
    //     var row = 0;
    
    //     for(var index = 0; index< (data.length / 4); index++) {
    
    //         cellIndex++;
    
    //         if(cellIndex == width) {
    //             cellIndex = 0;
    //             row++;
    //         }
    
    //         var i = index * 4;
    
    //         var r = data[i];
    //         var g = data[i + 1];
    //         var b = data[i + 2];
    //         var a = data[i + 3];
    //         var l = (r + g + b) / 3;
    
    //         if(l > 150) {
    //             createCell(cellIndex, row, 3)
    //         }
    
    //         r = r + 70;
    //         g = g + 70;
    //         b = b + 70;
    
    //         if(r > 255) r = 255;
    //         if(g > 255) g = 255;
    //         if(b > 255) b = 255;
    
    //         if(l < 200) l = l + 50;
    
    //         if(l < 200) l = 200;
    
    //         var type = getElementFromColor({r: r, g: g, b: b});
    
    //         //Check if White
    
    //         createCell(cellIndex, row, type)
    
    //         // if(r < 100 && g < 100 && b < 100) {
    //         //     createCell(cellIndex, row, 7);
    //         // } else if(r > 150 && g > 150 && b > 150) {
    //         //     createCell(cellIndex, row, 3);
    //         // } else if(r > 200) {
    //         //     createCell(cellIndex, row, 8);
    //         // } else if(b > 100) {
    //         //     createCell(cellIndex, row, 2);
    //         // } else {
    //         //     createCell(cellIndex, row, 1)
    //         // }
    
    //         grid[row][cellIndex].alpha = l;
    
    
    //     }
    // }, 40);
});

function distance(a, b) {
    return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}

var baseColors = [
    {
        type: 1,
        r: 220,
        g: 167,
        b: 110,
    },
    {
        type: 2,
        r: 152,
        g: 189,
        b: 249,
    },
    {
        type: 3,
        r: 98,
        g: 98,
        b: 98,
    },
    {
        type: 4,
        r: 155,
        g: 89,
        b: 55,
    },
    {
        type: 5,
        r: 157,
        g: 70,
        b: 70,
    },
    {
        type: 6,
        r: 255,
        g: 100,
        b: 100,
    },
    {
        type: 8,
        r: 70,
        g: 6,
        b: 0,
    },
    {
        type: 9,
        r: 79,
        g: 121,
        b: 22,
    },
    {
        type: 11,
        r: 180,
        g: 60,
        b: 255,
    },
    {
        type: 12,
        r: 100,
        g: 165,
        b: 180,
    }
]

function getElementFromColor(color){
    var lowest = Number.POSITIVE_INFINITY;
    var tmp;
    let index = 0;
    baseColors.forEach( (el, i) => {
        tmp = distance(color, el)
        if (tmp < lowest) {
          lowest = tmp;
          index = i;
        };
        
    })
    return baseColors[index].type;
    
  }