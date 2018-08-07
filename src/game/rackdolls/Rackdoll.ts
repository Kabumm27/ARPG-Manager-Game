import { Game } from "../Game";
import { Vector2 } from "../util";
import { Particle } from "./Particle";


export class Rackdoll {
    protected game: Game;
    public active: boolean;

    public particles: Particle[];

    public pos: Vector2;

    public timeLeft: number;
    public totalTime: number;

    public constructor(game: Game) {
        this.game = game;
        this.active = false;

        this.particles = [];
        this.pos = new Vector2();

        this.timeLeft = 0;
        this.totalTime = 0;
    }
    
    
    public activate(pos: Vector2) {

    }

    public update(dt: number) {
        this.timeLeft -= dt;
        if (this.timeLeft <= 0) this.active = false;

        if (!this.active) return;

        for (const particle of this.particles) {
            particle.update(dt);
        }
    }
}