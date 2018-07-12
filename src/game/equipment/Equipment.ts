import { EquipmentBaseStats } from "."
import { Loot, Rarity, LootTypes, LootCategory } from "game/loot"
import { ModifierStats } from "game/stats"


export class Equipment implements Loot {
    public name: string;
    public slot: EquipmentSlot;
    public rarity: Rarity;
    
    public baseStats: EquipmentBaseStats;
    public modifierStats: ModifierStats;
    
    public constructor(name: string, rarity: Rarity) {
        this.name = name;
        this.rarity = rarity;

        this.modifierStats = new ModifierStats();
    }

    public getTooltipData(): LootTypes {
        const baseStats = new Array<string>();
        const modifierStats = new Array<string>();

        baseStats.push(this.baseStats.armor + " Armor");

        modifierStats.push(...this.modifierStats.toStrings());

        return {
            category: LootCategory.Equipment,
            rarity: this.rarity,
            slot: this.slot,
            baseStats: baseStats,
            modifierStats: modifierStats,
            text: "First armor to be created. First armor to be worn."
        }
    }
}

export enum EquipmentSlot {
    Weapon,
    Hands,
    Head,
    Body,
    Feet
}
