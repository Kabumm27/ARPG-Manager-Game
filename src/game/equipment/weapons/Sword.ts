import { BaseWeapon, WeaponType } from "."
import { Rarity } from "../../loot"


export class Sword extends BaseWeapon {

    public constructor() {
        super("MySword", Rarity.Common);

        this.type = WeaponType.Sword;

        this.baseStats.fireDmgMin = 2;
        this.baseStats.fireDmgMax = 4;
    }
}
