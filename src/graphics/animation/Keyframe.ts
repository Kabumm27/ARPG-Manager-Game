import { Vector2 } from "game/util";


export interface Transition {
    target: "position-x" | "position-y" | "scale-x" | "scale-y" | "rotation",
    from: number,
    to: number
}

export class Keyframe {
    public transitions: Transition[];

    public duration: number;
    // public elapsedTime: number;

    public constructor(transitions: Transition[], duration: number) {
        this.transitions = transitions;
        this.duration = duration;
    }
}
