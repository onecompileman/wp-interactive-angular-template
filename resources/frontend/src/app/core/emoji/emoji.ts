export class Emoji {
    p5: any;
    pos: any;
    vel: any;
    speed: number;
    life = 90;
    size = 30;
    sprite: any;
    scale: number = 1;
    opacity = 1;
    acc: any;

    constructor(p5, sprite, pos, vel, speed, scale) {
        this.p5 = p5;
        this.sprite = sprite;
        this.pos = pos;
        vel.normalize().setMag(speed);
        this.vel = vel;
        this.scale = scale;

        this.acc = p5.createVector(0, -0.05);
        this.vel.limit(5 * scale);
    }

    draw() {
        this.p5.push();
        this.p5.translate(this.pos.x, this.pos.y);
        this.p5.image(
            this.sprite,
            0,
            0,
            this.size * this.scale * this.opacity,
            this.size * this.scale * this.opacity
        );
        this.p5.pop();
    }

    update() {
        this.life--;
        if (this.life <= 0) {
            this.opacity -= 0.1;
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.pos.x = this.p5.constrain(
            this.pos.x,
            this.size,
            this.p5.width - this.size
        );
    }

    isDead() {
        return this.opacity <= 0;
    }
}
