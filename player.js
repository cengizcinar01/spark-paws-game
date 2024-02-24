import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';
import { FLoatingMessages } from './floatingMessages.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(this.game),
        ];
        this.currentState = null;
    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);

        this.speed =
            input.includes('ArrowRight') && this.currentState !== this.states[6]
                ? this.maxSpeed
                : input.includes('ArrowLeft') && this.currentState !== this.states[6]
                ? -this.maxSpeed
                : 0;

        this.x += this.speed;
        this.x = Math.max(0, Math.min(this.x, this.game.width - this.width));

        this.vy += !this.onGround() ? this.weight : -this.vy;
        this.y += this.vy;
        this.y = Math.min(this.y, this.game.height - this.height - this.game.groundMargin);

        this.frameTimer += deltaTime;
        if (this.frameTimer > this.frameInterval) {
            this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
            this.frameTimer = 0;
        }
    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision() {
        this.game.enemies.forEach((enemy) => {
            if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                if ([4, 5].includes(this.currentState)) {
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessages('+1', enemy.x, enemy.y, 3.7, 1.4));
                } else {
                    this.setState(6, 0);
                    this.game.lives--;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
            }
        });
    }
}
