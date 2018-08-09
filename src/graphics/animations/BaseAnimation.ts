import { Vector2 } from "game/util";
import { Keyframe } from ".";


export class BaseAnimation {
    public keyframes: Keyframe[];

    public currentFrame: number;
    public timer: number;

    public constructor() {
        this.keyframes = new Array();
        this.currentFrame = 0;
    }


    public addKeyframe(points: Vector2[], duration: number) {
        const keyframe = new Keyframe(points, duration);
        this.keyframes.push(keyframe);
    }

    public getPolygonPoints(pos: Vector2, dir: Vector2, angle: number) {
        if (this.keyframes.length === 0) return null;

        const points = this.keyframes[this.currentFrame].points;
        
        return points.map(v => v.clone().rotate(angle).add(pos));
    }
}
