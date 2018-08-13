import { Game } from "game";
import { Vector2 } from "game/util";
import { Graphics, GraphicsLayer, IDrawable } from "../base";
import { Player } from "game/entities";
import { PlayerCharacter } from "game/entities/player";
import { PlayerIdleAnimation } from "./PlayerIdleAnimation";
import { PlayerAttackAnimation } from "./PlayerAttackAnimation";
import { PlayerSwingAnimation } from "./PlayerSwingAnimation";


export class PlayerGraphics extends Graphics {

    public constructor(game: Game, player: IDrawable) {
        super(game, player);

        // Animations
        const idle = new PlayerIdleAnimation(this.animation);
        this.animation.setAnimation(idle.category, idle);
        const attack = new PlayerAttackAnimation(this.animation);
        this.animation.setAnimation(attack.category, attack);

        // Transitions
        this.animation.setTransition(attack.category, "finished", idle.category);

        // Graphics
        this.layers.push(new GraphicsLayer([
            new Vector2(0.2, 0),
            new Vector2(-0.2, 0.15),
            new Vector2(-0.1, 0),
            new Vector2(-0.2, -0.15)
        ], "black"));

        // Layer 1 - Weapon
        this.layers.push(new GraphicsLayer([
            new Vector2(0.25, 0),
            new Vector2(0.1, 0.08),
            new Vector2(0.1, -0.08)
        ], "DodgerBlue"));
    }

    public update() {
        super.update();

        if (this.object instanceof PlayerCharacter) {
            this.layers[1].visible = !!this.object.gear.weapon;
        }
    }
}
