import { Vector2 } from "game/util";


export class Keyframe {
    public points: Vector2[];
    public duration: number;

    public constructor(points: Vector2[], duration: number) {
        this.points = points;
        this.duration = duration;
    }
}
