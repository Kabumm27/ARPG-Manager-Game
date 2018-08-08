import { Vector2 } from "game/util"

export interface Positionable {
    pos: Vector2;
    dir: Vector2;
    passthrough: boolean;
}