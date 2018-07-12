import { ModifierStats, ModifierType } from "../stats"
import { EquipmentBaseStats } from "../equipment"
import { EntityBaseStats } from "."


export class CalculatedEntityStats {
    public health: number;
    public healthReg: number;
    public currentHealth: number;

    public mana: number;
    public manaReg: number;
    public currentMana: number;

    public movementSpeed: number;

    public int: number;
    public dex: number;
    public str: number;

    public armor: number;
    public physResistance: number;


    public constructor(baseStats: EntityBaseStats, equipmentBaseStats: EquipmentBaseStats, modifierStats: ModifierStats) {
        this.calculate(baseStats, equipmentBaseStats, modifierStats);
        this.currentHealth = this.health;
        this.currentMana = this.mana;
    }

    public calculate(baseStats: EntityBaseStats, equipmentBaseStats: EquipmentBaseStats, modifierStats: ModifierStats) {
        // Health
        this.health = modifierStats.apply(baseStats.health, ModifierType.Health);
        this.healthReg = modifierStats.apply(baseStats.healthReg, ModifierType.HealthReg);
        if (this.currentHealth > this.health) this.currentHealth = this.health;

        // Mana
        this.mana = modifierStats.apply(baseStats.mana, ModifierType.Mana);
        this.manaReg = modifierStats.apply(baseStats.manaReg, ModifierType.ManaReg);
        if (this.currentMana > this.mana) this.currentMana = this.mana;

        // Movement Speed
        this.movementSpeed = modifierStats.apply(baseStats.movementSpeed, ModifierType.MovementSpeed);

        // Main stats
        this.int = modifierStats.apply(baseStats.int, ModifierType.Int);
        this.dex = modifierStats.apply(baseStats.dex, ModifierType.Dex);
        this.str = modifierStats.apply(baseStats.str, ModifierType.Str);

        // Armor
        this.armor = modifierStats.apply(equipmentBaseStats.armor, ModifierType.Armor);
        this.physResistance = this.armor / 15;
    }
}
