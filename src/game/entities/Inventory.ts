import { Game } from "../Game"
import { Entity } from "."
import { Loot } from "../loot"
import { EquipmentFactory } from "../equipment/factory"


export class Inventory {
    public items: Loot[];

    public constructor(game: Game, entity: Entity) {
        this.items = new Array();


        // DEBUG
        // this.items.push(EquipmentFactory.generateBreastarmor());
    }

    public removeItem(item: Loot) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                this.items.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    public add(item: Loot) {
        if (item) {
            this.items.push(item);
        }
    }

    public addAll(items: Loot[]) {
        for (const item of items) {
            if (item) {
                this.items.push(item);
            }
        }
    }
}