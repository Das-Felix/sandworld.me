var animationFramesQueue = [];

var computed = false;
var animation;

var recording = false;
var recordedAnimation;

var currentAnimationFrame = 0;

function renderFrame(frame) {

    currentAnimationFrame++;

    if(animationFramesQueue[frame] != null && computed && animationFramesQueue[frame].paint) {
        var point = animationFramesQueue[frame];

        console.log("animation")
        paint(point.x, point.y, 6, point.material);
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

    computed = true;
}

loadAnimations();

function loadAnimations() {
    fetch("./js/animation/animations/animation_02.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        animation = jsondata;
        computeAnimation(animation);
    });
}

function startAnimationRecording() {

    recordedAnimation = {
        "duration": 0,
        "keyframes": []
    };
    
    recording = true;
    setStatus("RECORDING", "WARN");
}

function stopAnimationRecording() {
    recording = false;
    
    console.log(recordedAnimation);


    clearStatus();
}

function recordAnimationFrame() {
    recordedAnimation.duration = recordedAnimation.duration + 1;

    recordedAnimation.keyframes.push({
        x: mouseX,
        y: mouseY,
        material: currentMaterial,
        paint: mouseDown,
    });
}

function playRecordedAnimation() {
    reset();

    currentAnimationFrame = 0;

    recordedAnimation.keyframes.forEach(frame => {
        animationFramesQueue.push(frame);
    });

}