import { BaseBuff } from ".."
import { Entity } from "game/entities"
import { BaseWeapon } from "game/equipment/weapons"
import { BasicDot } from "game/abilities/spells/buffspells"


export class FireDot extends BaseBuff {

    public constructor(source: Entity) {
        super("Fire Dot", "Description missing...", source);

        this.maxStacks = 5;
        this.duration = 30 * 1000;

        const bs = this.baseStats;
        // bs.fireDmgMin = 2;
        // bs.fireDmgMax = 2;

        this.ability = new BasicDot(this.name);
        this.ability.baseStats.fireDmgMin = 2;
        this.ability.baseStats.fireDmgMax = 3;
        this.ability.baseStats.fireDmgMulti = 1;

        const weapon = source.gear.weapon || BaseWeapon.default();
        this.ability.recalculate(weapon, source.cachedModifierStats);
    }
}
