import { Vector2 } from "game/util";
import { Keyframe } from ".";
import { AnimationState } from "./AnimationState";


export class BaseAnimation {
    private animationState: AnimationState;

    public keyframes: Keyframe[];
    public speed: number;

    public currentFrame: number;
    public currentTimer: number;

    public totalDuration: number;
    public timer: number;

    public loop: boolean;
    public isFinished: boolean;


    public constructor(animationState: AnimationState) {
        this.animationState = animationState;

        this.keyframes = new Array();
        this.speed = 3;

        this.currentFrame = 0;
        this.currentTimer = 0;

        this.totalDuration = 0;
        this.timer = 0;

        this.loop = false;
        this.isFinished = false;
    }


    public update(dt: number) {
        this.timer += dt;
        
        if (!this.loop && this.totalDuration / this.speed < this.timer) {
            if (!this.isFinished) this.animationState.animationCallback("finished", this);
            this.isFinished = true;
            return;
        }
        
        if (this.keyframes.length > 0) {
            this.currentTimer += dt;
            const delta = (this.keyframes[this.currentFrame].duration / this.speed) - this.currentTimer;

            if (delta <= 0) {
                this.currentFrame = (this.currentFrame + 1) % this.keyframes.length;
                this.currentTimer = -delta;
            }
        }
    }

    public reset() {
        this.currentFrame = 0;
        this.currentTimer = 0;
        this.timer = 0;
        this.isFinished = false;
    }

    public addKeyframe(kf: Keyframe) {

    }

    public getTransform() {
        const position = new Vector2();
        let rotation = 0;
        let scale = 1;

        if (this.keyframes.length > 0) {
            if (this.isFinished) {
                const frame = this.keyframes[this.keyframes.length - 1];
                
                for (const transition of frame.transitions) {
                    switch (transition.target) {
                        case "position-x":
                            position.x = transition.to;
                            break;
                        case "position-y":
                            position.y = transition.to;
                            break;
                    }
                }
            }
            else {
                const frame = this.keyframes[this.currentFrame];
                const progress = this.currentTimer / (frame.duration / this.speed);
                
                for (const transition of frame.transitions) {
                    switch (transition.target) {
                        case "position-x":
                            position.x = transition.from + (transition.to - transition.from) * progress;
                            break;
                        case "position-y":
                            position.y = transition.from + (transition.to - transition.from) * progress;
                            break;
                    }
                }
            }
        }

        return {
            pos: position,
            rot: rotation,
            scale: scale
        }
    }
}
