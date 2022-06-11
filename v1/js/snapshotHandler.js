var snapshots = [];
var maxUndoSteps = 10;

function saveSnapshot() {
    snapshots.push(clone(grid));
    if(snapshots.length > maxUndoSteps) {
        snapshots.pop(0);
    }
}

function loadSnapshot() {
    if(snapshots.length == 0) return;

    grid = snapshots[snapshots.length - 1];
    snapshots.pop(snapshots.length - 1);
}