import { Equipment, EquipmentSlot } from ".."
import { BodyBaseStats } from "."
import { Rarity, LootTypes, LootCategory } from "game/loot"


export class BaseBodyarmor extends Equipment {
    public baseStats: BodyBaseStats;


    public constructor(name: string, rarity: Rarity) {
        super(name, rarity);

        this.slot = EquipmentSlot.Body;
        this.baseStats = new BodyBaseStats();
    }
}
