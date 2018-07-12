import { BaseWeapon } from "."
import { Rarity } from "../../loot"


export class Wand extends BaseWeapon {


    public constructor() {
        super("MyWand", Rarity.Common);
        
        this.baseStats.range = 3;
    }
}
