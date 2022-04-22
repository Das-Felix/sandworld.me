var animationFramesQueue = [];

var computed = false;
var animation;

function renderFrame(frame) {
    if(animationFramesQueue[frame] != null && computed && animationFramesQueue[frame].paint) {
        var point = animationFramesQueue[frame];
        
        paint(point.x, point.y, 6, point.material);
    }
}

function computeAnimation(animation) {
    var keyframes = animation.keyframes;
    var mat = 1;
    var paint = true;

    for(var i = 0; i < keyframes.length; i++) {
        
        var currentKeyframe = keyframes[i];
        var nextKeyframe = keyframes[i + 1];

        if(nextKeyframe == null) continue;

        var duration = nextKeyframe.frame - currentKeyframe.frame;

        for(var j = 0; j < duration; j ++) {

            var point = {
                paint: paint,
                x: 0,
                y: 0,
                material: mat,
            }

            progress = j / duration;

            point.x = Math.round(currentKeyframe.x + (nextKeyframe.x - currentKeyframe.x) * progress);
            point.y = Math.round(currentKeyframe.y + (nextKeyframe.y - currentKeyframe.y) * progress);
            
            if(currentKeyframe.switchMaterial) mat = currentKeyframe.switchMaterial;
            if(currentKeyframe.stop) paint = false;
            if(currentKeyframe.start) paint = true;

            animationFramesQueue.push(point);
        }
    }

    computed = true;
}

loadAnimations();

function loadAnimations() {
    fetch("/js/animation/animations/animation_01.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        animation = jsondata;
        computeAnimation(animation);
    });
}