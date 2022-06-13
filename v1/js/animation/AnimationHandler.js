var animationFramesQueue = [];

var computed = false;
var animation;

var recording = false;
var recordedAnimation;

var currentAnimationFrame = 0;

function renderFrame(frame) {

    currentAnimationFrame++;

    if(animationFramesQueue[currentAnimationFrame] != null && computed && animationFramesQueue[currentAnimationFrame].paint) {
        var point = animationFramesQueue[currentAnimationFrame];
        var lastPoint = animationFramesQueue[currentAnimationFrame - 1];

        if(lastPoint && lastPoint.paint) {
            var duration = 20;
    
            for(var i = 0; i < duration; i ++) {
        
                progress = i / duration;
        
                var x = Math.round(lastPoint.x + (point.x - lastPoint.x) * progress);
                var y = Math.round(lastPoint.y + (point.y - lastPoint.y) * progress);
            }

            paint(x, y, point.brushSize, point.material);
        }

        paint(point.x, point.y, point.brushSize, point.material);
    }

    if(recording) {
        recordAnimationFrame(frame);
    }
}

// function computeKeyframeAnimation(animation) {
//     var keyframes = animation.keyframes;
//     var mat = 1;
//     var paint = true;

//     for(var i = 0; i < keyframes.length; i++) {
        
//         var currentKeyframe = keyframes[i];
//         var nextKeyframe = keyframes[i + 1];

//         if(nextKeyframe == null) continue;

//         var duration = nextKeyframe.frame - currentKeyframe.frame;

//         for(var j = 0; j < duration; j ++) {

//             var point = {
//                 paint: paint,
//                 x: 0,
//                 y: 0,
//                 material: mat,
//             }

//             progress = j / duration;

//             point.x = Math.round(currentKeyframe.x + (nextKeyframe.x - currentKeyframe.x) * progress);
//             point.y = Math.round(currentKeyframe.y + (nextKeyframe.y - currentKeyframe.y) * progress);
            
//             if(currentKeyframe.material != mat) mat = currentKeyframe.material;
//             if(currentKeyframe.stop) paint = false;
//             if(currentKeyframe.start) paint = true;

//             animationFramesQueue.push(point);
//         }
//     }

//     computed = true;
// }

function computeAnimation(animation) {
    animation.keyframes.forEach(frame => {
        animationFramesQueue.push(frame);
    });

    console.log("Animation Computed")
    computed = true;
}

loadAnimations();

function loadAnimations() {
    fetch("../js/animation/animations/animation_02.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        animation = jsondata;
        computeAnimation(animation);
    });
}

function startAnimationRecording() {

    var time = 5;

    var animationInterval;

    animationInterval = setInterval(() => {
        time--;
        
        if(time > -1) {
            setStatus("Recording in " + time + " seconds");
        } else {
            recordedAnimation = {
                "duration": 0,
                "keyframes": []
            };
            
            recording = true;
            setStatus("RECORDING", "WARN");
            clearInterval(animationInterval);
        }

    }, 1000);
}

function stopAnimationRecording() {
    recording = false;
    
    console.log(recordedAnimation);


    clearStatus();
}

function recordAnimationFrame() {

    console.log("Recording")

    recordedAnimation.duration = recordedAnimation.duration + 1;

    recordedAnimation.keyframes.push({
        x: mouseX,
        y: mouseY,
        material: currentMaterial,
        paint: mouseDown,
        brushSize: brushSize,
    });
}

function playRecordedAnimation() {
    reset();

    currentAnimationFrame = 0;

    recordedAnimation.keyframes.forEach(frame => {
        animationFramesQueue.push(frame);
    });

}

function playAnimation() {
    currentAnimationFrame = 0;
}