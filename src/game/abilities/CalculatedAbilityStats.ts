import { AbilityBaseStats } from "./AbilityBaseStats"
import { ModifierStats, ModifierType } from "../stats"
import { BaseWeapon } from "../equipment/weapons"

export class CalculatedAbilityStats {
    public atkSpd: number;

    public range: number;
    
    public physDmgMin: number;
    public physDmgMax: number;
    public fireDmgMin: number;
    public fireDmgMax: number;

    public healthCost: number;
    public manaCost: number;

    public cooldown: number;
    public atkThreshold: number;


    public constructor(baseStats: AbilityBaseStats, modifierStats: ModifierStats) {
        this.calculate(BaseWeapon.default(), baseStats, modifierStats);
    }

    public calculate(weapon: BaseWeapon, baseStats: AbilityBaseStats, modifierStats: ModifierStats) {
        // Attack Speed
        let atkSpd = weapon.baseStats.atkSpd;
        atkSpd *= baseStats.weaponAtkSpdMulti;
        this.atkSpd = modifierStats.apply(atkSpd, ModifierType.AttackSpeed);

        let range = weapon.baseStats.range;
        range *= baseStats.weaponRangeMulti;
        range += baseStats.bonusRange;
        this.range = modifierStats.apply(range, ModifierType.Range);

        // Phys Damage
        let physDmgMin = weapon.baseStats.physDmgMin;
        physDmgMin *= baseStats.weaponDmgMulti;
        physDmgMin += baseStats.physDmgMin;
        this.physDmgMin = modifierStats.apply(physDmgMin, ModifierType.PhysDmg);
        this.physDmgMin *= baseStats.physDmgMulti;
        
        let physDmgMax = weapon.baseStats.physDmgMax;
        physDmgMax *= baseStats.weaponDmgMulti;
        physDmgMax += baseStats.physDmgMax;
        this.physDmgMax = modifierStats.apply(physDmgMax, ModifierType.PhysDmg);
        this.physDmgMax *= baseStats.physDmgMulti;

        // Fire Damage
        let fireDmgMin = weapon.baseStats.fireDmgMin;
        fireDmgMin *= baseStats.weaponDmgMulti;
        fireDmgMin += baseStats.fireDmgMin;
        this.fireDmgMin = modifierStats.apply(fireDmgMin, ModifierType.FireDmg);
        this.fireDmgMin *= baseStats.fireDmgMulti;
        
        let fireDmgMax = weapon.baseStats.fireDmgMax;
        fireDmgMax *= baseStats.weaponDmgMulti;
        fireDmgMax += baseStats.fireDmgMax;
        this.fireDmgMax = modifierStats.apply(fireDmgMax, ModifierType.FireDmg);
        this.fireDmgMax *= baseStats.fireDmgMulti;

        // Cooldown
        this.cooldown = modifierStats.apply(baseStats.cooldown, ModifierType.Cooldown);

        // Manacost
        this.manaCost = modifierStats.apply(baseStats.manaCost, ModifierType.ResourceCost);

        // Attack threshold
        this.atkThreshold = Math.max(this.cooldown, this.atkSpd <= 0 ? 0 : 1000 / this.atkSpd);
    }
}