import { Game } from "game";
import { Entity } from "game/entities";
import { BaseAnimation } from "./BaseAnimation";
import { Vector2 } from "game/util";


export class AnimationState {
    private game: Game;
    public entity: Entity;

    public idle: BaseAnimation;

    public currentState: "idle";


    public constructor(game: Game, entity: Entity) {
        this.game = game;
        this.entity = entity;

        this.currentState = "idle";
    }


    public setIdleAnimation(animation: BaseAnimation) {
        this.idle = animation;
    }

    public getPolygonPoints() {
        const pos = this.entity.pos;
        const dir = this.entity.dir;
        const angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI;

        if (this.currentState === "idle") {
            return this.idle.getPolygonPoints(pos, dir, angle);
        }

        return null;
    }
}