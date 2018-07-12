import { Equipment, EquipmentSlot } from ".."
import { BootBaseStats } from "."
import { Rarity } from "game/loot"


export class BaseBoots extends Equipment {
    public baseStats: BootBaseStats;


    public constructor(name: string, rarity: Rarity) {
        super(name, rarity);

        this.slot = EquipmentSlot.Feet;
        this.baseStats = new BootBaseStats();
    }
}
