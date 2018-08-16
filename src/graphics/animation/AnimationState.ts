import { Game } from "game";
import { BaseAnimation } from ".";
import { IDrawable } from "../base";
import { PlayerIdleAnimation, PlayerAttackAnimation } from "../player";
import { Vector2 } from "game/util";
import { PlayerSwingAnimation } from "../player/PlayerSwingAnimation";


export interface IAnimationCallbackEvent {
    event: string,
    callback: ()=>void
}

export class AnimationState {
    private game: Game;

    public object: IDrawable;
    public events: IAnimationCallbackEvent[];

    public animations: Map<string, BaseAnimation>;
    public transitions: Map<string, Map<string, string>>;

    public currentAnimation: BaseAnimation;


    public constructor(game: Game, object: IDrawable) {
        this.game = game;
        
        this.object = object;
        this.events = new Array();
        
        this.animations = new Map();
        this.transitions = new Map();
    }


    public update() {
        if (this.currentAnimation) this.currentAnimation.update();
    }

    public setAnimation(name: string, animation: BaseAnimation) {
        this.animations.set(name, animation);
    }

    public setTransition(origin: string, trigger: string, target: string) {
        if (!this.transitions.has(origin)) this.transitions.set(origin, new Map());

        this.transitions.get(origin).set(trigger, target);
    }

    public animationCallback(event: string, animation: BaseAnimation) {
        if (this.transitions.has(animation.slot)) {
            const transition = this.transitions.get(animation.slot);
            if (transition.has(event)) {
                this.changeAnimation(transition.get(event));
            }
        }

        for (let i = 0; i < this.events.length; i++) {
            const ev = this.events[i];
            if (ev.event === event) {
                ev.callback();
                this.events.splice(i);
                i--;
            }
        }
    }

    public registerEvent(event: string, cb: ()=>void) {
        this.events.push({
            event: event,
            callback: cb
        });
    }

    public changeAnimation(animationSlot: string) {
        if (this.animations.has(animationSlot)) {
            this.currentAnimation = this.animations.get(animationSlot);

            this.currentAnimation.reset();
            this.animationCallback("start", this.currentAnimation);
        }
    }

    public getTransform() {
        if (!this.currentAnimation) {
            return {
                position: new Vector2(0, 0),
                rotation: 0,
                scale: new Vector2(1, 1)
            }
        }

        return this.currentAnimation.getTransform();
    }
}
