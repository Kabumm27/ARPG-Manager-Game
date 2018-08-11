import { Vector2 } from "../util";
import { Timer } from "../entities";

export class Particle {
    public pos: Vector2;
    public dir: Vector2;
    public speed: number;
    public acceleration: number;

    public isVisible: boolean;

    public timeLeft: number;
    public timeTotal: number;

    public constructor(pos: Vector2, rot: number, speed: number, duration: number, acceleration: number = 1) {
        const variance = 0.4;
        const inverseVariance = 1 / variance;
        this.pos = pos;
        // this.dir = new Vector2(1, 0).rotate(rot + (Math.random() * variance * rot) - (rot * variance / 2));
        this.dir = new Vector2(1, 0).rotate(rot * (inverseVariance - 0.5 + Math.random()));
        this.speed = speed + (Math.random() * variance * speed) - (speed * variance / 2);
        this.acceleration = acceleration; // TODO: Integral

        this.timeLeft = 0;
        this.timeTotal = Math.random() * duration;

        this.isVisible = false;
    }

    public update() {
        this.timeLeft -= Timer.deltaTime;

        const speedReductionPerMs = this.speed / this.timeTotal;
        const speed = this.speed - (this.timeTotal - this.timeLeft + (Timer.deltaTime / 2)) * speedReductionPerMs;

        if (this.timeLeft > 0) {
            const movement = speed * Timer.deltaTimeMulti;
            this.pos.x += this.dir.x * movement;
            this.pos.y += this.dir.y * movement;
        }
    }
}