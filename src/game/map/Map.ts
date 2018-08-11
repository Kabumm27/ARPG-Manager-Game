import { Game } from "game"
import { Vector2 } from "game/util"
import { Entity } from "game/entities"
import { Enemy } from "game/entities/enemies"
import { IPositionable, AStar } from "."


export class Map {
    public game: Game;

    public objects: IPositionable[];

    public width: number;
    public height: number;

    public constructor(game: Game, width: number, height: number) {
        this.game = game;
        
        this.width = width;
        this.height = height;

        this.objects = new Array();

        AStar.test();
    }

    public getNeighbours(x: number, y: number) {
        
    }

    public add(obj: IPositionable) {
        this.objects.push(obj);
    }

    public remove(obj: IPositionable) {
        for (let i = 0; i < this.objects.length; i++) {
            const object = this.objects[i];
            if (object === obj) {
                this.objects.splice(i, 1);
                break;
            }
        }
    }

    public isPositionFree(x: number, y: number) {
        for (const obj of this.objects) {
            if (obj.passthrough && obj.pos.x === x && obj.pos.y === y) {
                return false;
            }
        }

        return true;
    }

    public getEntitisInRange(x: number, y: number, r: number) {
        const position = new Vector2(x, y);
        const entities = new Array<Entity>();
        
        for (const object of this.objects) {
            if (!object.passthrough && position.distance(object.pos) <= r) {
                if (object instanceof Entity) {
                    entities.push(object);
                }
            }
        }

        return entities;
    }

    public getEnemiesInRange(x: number, y: number, r: number) {
        return this.getEntitisInRange(x, y, r).filter(entity => entity instanceof Enemy);
    }
}