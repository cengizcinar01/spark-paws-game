export class FLoatingMessages {
    constructor(value, x, y, targetX, targetY) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
    }
    update() {
        this.x += this.targetX - this.x;
        this.y += this.targetY - this.y;
        this.timer++;
        if (this.timer > 100) this.markedForDeletion = true;
    }

    draw() {}
}
