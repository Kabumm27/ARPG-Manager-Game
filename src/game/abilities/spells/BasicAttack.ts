import { BaseAbility } from "../."
import { BaseWeapon } from "../../equipment/weapons"


export class BasicAttack extends BaseAbility {


    public constructor() {
        super("Basic Attack");

        this.baseStats.weaponDmgMulti = 1;
        this.baseStats.weaponAtkSpdMulti = 2;
        this.baseStats.weaponRangeMulti = 1;

        this.baseStats.physDmgMulti = 1;
        this.baseStats.fireDmgMulti = 1;
    }
}
