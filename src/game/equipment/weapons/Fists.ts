import { BaseWeapon } from "."
import { Rarity } from "../../loot"


export class Fists extends BaseWeapon {

    public constructor() {
        super("Fists", Rarity.None);
    }
}
