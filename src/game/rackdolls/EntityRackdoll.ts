import { Game } from "../Game";
import { Rackdoll } from "./Rackdoll";
import { Particle } from "./Particle";
import { Vector2 } from "../util";


export class EntityRackdoll extends Rackdoll {
    // Types:
    // - Splatter
    // - Fly away

    public constructor(game: Game) {
        super(game);

        this.totalTime = 2500;
        this.timeLeft = 0;

        for (let i = 0; i < 30; i++) {
            const rot = 360 / 30 * i;
            const dir = new Vector2(1, 0).rotate(rot);

            const particle = new Particle(this.pos.copy(), rot, 4, 350, 1);
            this.particles.push(particle);
        }
    }

    public activate(pos: Vector2) {
        this.active = true;
        this.pos.set(pos.x, pos.y);
        this.timeLeft = this.totalTime;

        for (const particle of this.particles) {
            particle.pos.set(pos.x, pos.y);
            particle.timeLeft = particle.timeTotal;
            particle.isVisible = true;
        }
    }

    public update(dt: number) {
        super.update(dt);
    }
}