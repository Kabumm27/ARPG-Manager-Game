import { Vector2 } from "game/util";
import { Keyframe } from ".";
import { AnimationState } from "./AnimationState";
import { Timer } from "game/entities";
import { setupMaster } from "cluster";
import { AnimationTransform } from "./AnimationTransform";


export interface IAnimationEvent {
    event: string,
    time: number
}

export class BaseAnimation {
    private animationState: AnimationState;

    public name: string;
    public slot: string;
    public tags: string[];

    public keyframes: Keyframe[];
    public events: IAnimationEvent[];
    public speed: number;

    public currentFrame: number;
    public currentTimer: number;

    public totalDuration: number;
    public timer: number;

    public loop: boolean;
    public isFinished: boolean;


    public constructor(animationState: AnimationState, name: string, category: string) {
        this.animationState = animationState;

        this.name = name;
        this.slot = category;

        this.keyframes = new Array();
        this.events = new Array();
        this.speed = 1;

        this.currentFrame = 0;
        this.currentTimer = 0;

        this.totalDuration = 0;
        this.timer = 0;

        this.loop = false;
        this.isFinished = false;
    }


    public update() {
        this.timer += Timer.deltaTime;
        
        if (!this.loop && this.totalDuration / this.speed < this.timer) {
            if (!this.isFinished) this.animationState.animationCallback("finished", this);
            this.isFinished = true;
            return;
        }
        
        if (this.keyframes.length > 0) {
            this.currentTimer += Timer.deltaTime;
            const delta = (this.keyframes[this.currentFrame].duration / this.speed) - this.currentTimer;

            for (const ev of this.events) {
                if (ev.time / this.speed <= this.currentTimer) {
                    this.animationState.animationCallback(ev.event, this);
                }
            }

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

    public addKeyframe(keyframe: Keyframe) {
        this.keyframes.push(keyframe);

        this.totalDuration = this.keyframes
            .map(kf => kf.duration)
            .reduce((sum, current) => sum += current, 0);
    }

    public addEvent(event: string, time: number) {
        this.events.push({
            event: event,
            time: time
        });
    }

    private setAnimationTransformValue(transform: AnimationTransform, target: string, value: number) {
        switch (target) {
            case "position-x":
                transform.position.x = value;
                break;
            case "position-y":
                transform.position.y = value;
                break;
            case "rotation":
                transform.rotation = value;
                break;
            case "scale-x":
                transform.scale.x = value;
                break;
            case "scale-y":
                transform.scale.y = value;
                break;
        }
    }

    public getTransform() {
        const transform = new AnimationTransform();

        if (this.keyframes.length > 0) {
            if (this.isFinished) {
                const frame = this.keyframes[this.keyframes.length - 1];
                
                for (const transition of frame.transitions) {
                    this.setAnimationTransformValue(transform, transition.target, transition.to);
                }
            }
            else {
                const frame = this.keyframes[this.currentFrame];
                const progress = this.currentTimer / (frame.duration / this.speed);
                
                for (const transition of frame.transitions) {
                    const value = transition.from + (transition.to - transition.from) * progress;
                    this.setAnimationTransformValue(transform, transition.target, value);
                }
            }
        }

        return transform;
    }
}
