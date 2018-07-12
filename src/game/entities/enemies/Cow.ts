import { Game } from "game"
import { Map } from "game/map"
import { Enemy } from "."


export class Cow extends Enemy {


    public constructor(game: Game, map: Map, level: number) {
        super(game, map, "Cow", 8, 0);
    }
}