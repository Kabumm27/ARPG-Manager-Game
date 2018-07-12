import { Equipment, EquipmentSlot } from ".."
import { HandsBaseStats } from "."
import { Rarity } from "game/loot"


export class BaseGauntlet extends Equipment {
    public baseStats: HandsBaseStats;


    public constructor(name: string, rarity: Rarity) {
        super(name, rarity);

        this.slot = EquipmentSlot.Hands;
        this.baseStats = new HandsBaseStats();
    }
}
