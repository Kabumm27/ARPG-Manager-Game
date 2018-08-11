import { Game } from "game";
import { BaseAnimation } from ".";
import { IDrawable } from "../IDrawable";
import { PlayerIdleAnimation, PlayerAttackAnimation } from "../player";
import { Vector2 } from "game/util";
import { Graphics } from "../Graphics";


export class AnimationState {
    private game: Game;
    private graphics: Graphics;

    public object: IDrawable;

    public idle: BaseAnimation;
    public attack: BaseAnimation;

    public currentState: "idle" | "attack";
    public currentAnimation: BaseAnimation;


    public constructor(game: Game, graphics: Graphics, object: IDrawable) {
        this.game = game;
        this.graphics = graphics;
        this.object = object;

        // this.currentState = "idle";
    }


    public update(dt: number) {
        if (this.currentAnimation) this.currentAnimation.update(dt);
    }

    public animationCallback(event: string, animation: BaseAnimation) {
        if (animation instanceof PlayerAttackAnimation) {
            if (event === "finished") {
                this.changeAnimation("idle");
            }
        }
    }

    public changeAnimation(state: "idle" | "attack") {
        this.currentState = state;

        switch (state) {
            case "idle":
                this.currentAnimation = this.idle;
                break;
            case "attack":
                this.currentAnimation = this.attack;
                break;
        }

        this.currentAnimation.reset();
        this.animationCallback("start", this.currentAnimation);
    }

    public getTransform() {
        if (!this.currentAnimation) {
            return {
                pos: new Vector2(0, 0),
                rot: 0,
                scale: 1
            }
        }

        return this.currentAnimation.getTransform();
    }
}
