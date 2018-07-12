import { Equipment, EquipmentSlot } from ".."
import { HeadBaseStats } from "."
import { Rarity } from "game/loot"


export class BaseHelmet extends Equipment {
    public baseStats: HeadBaseStats;


    public constructor(name: string, rarity: Rarity) {
        super(name, rarity);

        this.slot = EquipmentSlot.Head;
        this.baseStats = new HeadBaseStats();
    }
}
