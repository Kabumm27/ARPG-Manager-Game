import { EquipmentSlot } from "../equipment"

export interface Loot {
    name: string;

    getTooltipData(): LootTypes;
}

export type LootTypes = EquipmentLoot | QuestLoot;

export type EquipmentLoot = {
    category: LootCategory.Equipment,
    rarity: Rarity,
    slot: EquipmentSlot,
    baseStats: string[],
    modifierStats: string[],
    text: string
};

export type QuestLoot = {
    category: LootCategory.Quest,
    rarity: Rarity,
    text: string
}

export enum LootCategory {
    Equipment,
    Quest
}

export enum Rarity {
    None,
    Common,
    Normal,
    Rare,
    Legendary
}
