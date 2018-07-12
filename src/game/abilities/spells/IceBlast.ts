import { BaseAbility } from "../."
import { BaseWeapon } from "../../equipment/weapons"


export class IceBlast extends BaseAbility {


    public constructor() {
        super("Iceblast");

        this.baseStats.bonusRange = 3;

        this.baseStats.physDmgMin = 2;
        this.baseStats.physDmgMax = 4;

        this.baseStats.cooldown = 3500;

        this.baseStats.manaCost = 4;
    }
}