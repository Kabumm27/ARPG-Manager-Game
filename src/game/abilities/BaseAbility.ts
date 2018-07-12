import { RNG } from "game/util"
import { Entity } from "game/entities"
import { BaseBuff } from "game/buffs"
import { ModifierStats } from "game/stats"
import { BaseWeapon } from "game/equipment/weapons"
import { FireDot } from "game/buffs/debuffs"
import { CalculatedAbilityStats, AbilityBaseStats } from "."
import { BasicDot } from "./spells/buffspells"


export class BaseAbility {
    public name: string;

    public rng: RNG;

    public baseStats: AbilityBaseStats;
    public modifierStats: ModifierStats;
    public calculatedStats: CalculatedAbilityStats;

    // required weapon, attributes(str, dex, int)
    // public requiredLevel: number;


    public constructor(name: string) {
        this.name = name;
        this.rng = new RNG(Math.random);

        this.baseStats = new AbilityBaseStats();
        this.modifierStats = new ModifierStats();
        this.calculatedStats = new CalculatedAbilityStats(this.baseStats, this.modifierStats);
    }

    public recalculate(weapon: BaseWeapon, globalModifierStats: ModifierStats) {
        this.calculatedStats.calculate(weapon, this.baseStats, globalModifierStats);
    }

    public calculateImpact(type: AttackType, source: Entity) {
        switch(type) {
            case AttackType.Primary:
                return this.calculatePrimaryImpact(source);
            case AttackType.Secondary:
                return this.calculateSecondaryImpact(source);
            default: 
                return <AbilityImpact> {
                    damage: {
                        fire: 0,
                        phys: 0
                    },
                    buffs: []
                }
        }
    }

    // Direct hit
    protected calculatePrimaryImpact(source: Entity) {
        const stats = this.calculatedStats;

        return <AbilityImpact>{
            damage: {
                fire: this.rng.randomRangeInt(stats.fireDmgMin, stats.fireDmgMax),
                phys: this.rng.randomRangeInt(stats.physDmgMin, stats.physDmgMax)
            },
            buffs: []
        }
    }

    // AoE hit
    protected calculateSecondaryImpact(source: Entity) {
        const stats = this.calculatedStats;

        return <AbilityImpact>{
            damage: {
                fire: 0,
                phys: 0
            },
            buffs: []
        }
    }
}

export type AbilityImpact = {
    damage: AbilityDamage,
    buffs: BaseBuff[]
}

export type AbilityDamage = {
    fire: number,
    phys: number
}


export enum AttackType {
    Primary,
    Secondary,
    Friendly
}
