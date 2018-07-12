import { Equipment, EquipmentSlot } from "../."
import { WeaponBaseStats } from "."
import { Rarity, LootTypes, LootCategory } from "../../loot"

export class BaseWeapon extends Equipment {
    public type: WeaponType;
    public baseStats: WeaponBaseStats;


    public constructor(name: string, rarity: Rarity) {
        super(name, rarity);

        this.slot = EquipmentSlot.Weapon;
        this.type = WeaponType.None;

        this.baseStats = new WeaponBaseStats();
    }

    public getTooltipData(): LootTypes {
        const baseStats = new Array<string>();
        const modifierStats = new Array<string>();

        const bs = this.baseStats;
        if (bs.physDmgMax > 0) baseStats.push(bs.physDmgMin + " - " + bs.physDmgMax + " Phys dmg");
        if (bs.fireDmgMax > 0) baseStats.push(bs.fireDmgMin + " - " + bs.fireDmgMax + " Fire dmg");
        baseStats.push(this.baseStats.atkSpd + " aps")
        modifierStats.push(...this.modifierStats.toStrings());

        return {
            category: LootCategory.Equipment,
            rarity: this.rarity,
            slot: this.slot,
            baseStats: baseStats,
            modifierStats: modifierStats,
            text: ""
        }
    }

    public static default() {
        const defaultWeapon = new BaseWeapon("fists", Rarity.None);
        defaultWeapon.baseStats.physDmgMin = 1;
        defaultWeapon.baseStats.physDmgMax = 1;

        return defaultWeapon;
    }
}

export enum WeaponType {
    None,
    Bow,
    Fists,
    Sword,
    Wand
}