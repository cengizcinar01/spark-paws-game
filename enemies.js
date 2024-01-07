class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }
    update() {}
    draw() {}
}

class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = 200;
        this.y = 2;
        this.maxFrame = 5;
    }
}

class GroundEnemy extends Enemy {}

class ClimbingEnemy extends Enemy {}
