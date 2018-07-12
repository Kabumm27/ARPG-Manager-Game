import { BaseAbility } from "../."
import { BaseWeapon } from "../../equipment/weapons"


export class FireBall extends BaseAbility {


    public constructor() {
        super("Fireball");

        this.baseStats.bonusRange = 3;

        this.baseStats.fireDmgMin = 3;
        this.baseStats.fireDmgMax = 8;

        this.baseStats.cooldown = 1500;

        this.baseStats.manaCost = 7;
    }
}