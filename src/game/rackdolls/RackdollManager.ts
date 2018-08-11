import { Game } from "../Game";
import { Rackdoll } from "./Rackdoll";
import { EntityRackdoll } from "./EntityRackdoll";
import { Vector2 } from "../util";

// TODO: Pooling
export class RackdollManager {
    private game: Game;

    public isEnabled: boolean;
    public rackdolls: Rackdoll[];

    public constructor(game: Game) {
        this.game = game;
        this.isEnabled = true;
        this.rackdolls = [];

        for (let i = 0; i < 10; i++) {
            this.rackdolls.push(new EntityRackdoll(this.game));
        }
    }

    public update() {
        for (let i = 0; i< this.rackdolls.length; i++) {
            const rackdoll = this.rackdolls[i];
            if (rackdoll.active) {
                rackdoll.update();

                // if (rackdoll.timeLeft <= 0) {
                //     this.rackdolls.splice(i, 1);
                //     i--;
                // }
            }
        }
    }

    public spawn(pos: Vector2) {
        for (const rackdoll of this.rackdolls) {
            if (!rackdoll.active) {
                rackdoll.activate(pos);
                return true;
            }
        }

        return false;
    }
}
