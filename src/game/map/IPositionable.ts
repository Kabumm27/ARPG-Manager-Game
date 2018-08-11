import { Vector2 } from "game/util"

export interface IPositionable {
    pos: Vector2;
    dir: Vector2;
    passthrough: boolean;
}