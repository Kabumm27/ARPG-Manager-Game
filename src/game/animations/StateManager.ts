import { Game } from "../Game";
import { Entity } from "../entities";


export class StateManager {
    private game: Game;
    public entity: Entity;

    public constructor(game: Game, entity: Entity) {
        this.game = game;
        this.entity = entity;
    }
}