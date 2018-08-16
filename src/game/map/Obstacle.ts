import { IDrawable } from "graphics/base";
import { Vector2 } from "../util";
import { Game } from "../Game";
import { Map } from "./Map";


export class Obstacle implements IDrawable {
    private game: Game;
    private map: Map;

    public pos: Vector2;
    public dir: Vector2;

    public collisionRadius: number;


    public constructor(game: Game, map: Map, pos: Vector2, size: number) {
        this.game = game;
        this.map = map;

        this.pos = pos;
        this.dir = new Vector2(1, 0);

        this.collisionRadius = size;

        this.map.add(this);
    }
}
