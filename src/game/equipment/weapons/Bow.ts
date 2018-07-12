import { BaseWeapon } from "."
import { Rarity } from "../../loot"


export class Bow extends BaseWeapon {


    public constructor() {
        super("MyBow", Rarity.Common);

        this.baseStats.range = 3;
    }
}
