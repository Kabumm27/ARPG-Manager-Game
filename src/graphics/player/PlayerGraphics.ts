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
        this.animation.setAnimation(idle.slot, idle);
        const attack = new PlayerAttackAnimation(this.animation);
        this.animation.setAnimation(attack.slot, attack);

        // Transitions
        this.animation.setTransition(attack.slot, "finished", idle.slot);

        // Graphics
        this.layers.push(new GraphicsLayer([
            new Vector2(8, 0),
            new Vector2(-8, 6),
            new Vector2(-4, 0),
            new Vector2(-8, -6)
        ], "black"));

        // Layer 1 - Weapon
        this.layers.push(new GraphicsLayer([
            new Vector2(10, 0),
            new Vector2(4, 3.2),
            new Vector2(4, -3.2)
        ], "DodgerBlue"));

        this.animation.changeAnimation(idle.slot);
    }

    public update() {
        super.update();

        if (this.object instanceof PlayerCharacter) {
            this.layers[1].visible = !!this.object.gear.weapon;
        }
    }
}
