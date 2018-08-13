import { Vector2 } from "game/util";


export class AnimationTransform {
    public position: Vector2;
    public rotation: number;
    public scale: Vector2;

    public constructor(position?: Vector2, rotation?: number, scale?: Vector2) {
        this.position = position || new Vector2(0, 0);
        this.rotation = rotation || 0;
        this.scale = scale || new Vector2(1, 1);
    }
}