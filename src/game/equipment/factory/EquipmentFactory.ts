import { RNG } from "game/util"
import { ModifierStats, ModifierType } from "game/stats"
import { Rarity } from "game/loot"
import { Equipment, EquipmentSlot } from ".."
import { BaseBodyarmor } from "../body"
import { BaseBoots } from "../feet"
import { BaseGauntlet } from "../hands"
import { BaseHelmet } from "../head"
import { BaseWeapon } from "../weapons"


export class EquipmentFactory {
    private rng: RNG;

    private minModifierValues: ModifierStats;
    private maxModifierValues: ModifierStats;

    private modifierList: { type: ModifierType, mod: number }[];
    

    public constructor() {
        this.rng = new RNG(Math.random);

        this.minModifierValues = new ModifierStats();
        this.maxModifierValues = new ModifierStats();
        this.setMinMaxModifierValues();
        this.createModifierList();
    }

    private setMinMaxModifierValues() {
        const min = this.minModifierValues;
        const max = this.maxModifierValues;

        min.setModifier(ModifierType.Armor, 50, 0, 0);
        max.setModifier(ModifierType.Armor, 200, 0, 0);

        min.setModifier(ModifierType.AttackSpeed, 0, 0, 0.10);
        max.setModifier(ModifierType.AttackSpeed, 0, 0, 0.35);
        
        // min.setModifier(ModifierType.Cooldown, 0, 0, 0);
        // max.setModifier(ModifierType.Cooldown, 0, 0, 0);
        
        min.setModifier(ModifierType.Dex, 10, 0, 0);
        max.setModifier(ModifierType.Dex, 30, 0, 0);
        
        min.setModifier(ModifierType.Int, 10, 0, 0);
        max.setModifier(ModifierType.Int, 30, 0, 0);
        
        min.setModifier(ModifierType.Str, 10, 0, 0);
        max.setModifier(ModifierType.Str, 30, 0, 0);
        
        min.setModifier(ModifierType.FireDmg, 10, 0, 0.30);
        max.setModifier(ModifierType.FireDmg, 30, 0, 0.50);
        
        min.setModifier(ModifierType.PhysDmg, 10, 0, 0.30);
        max.setModifier(ModifierType.PhysDmg, 30, 0, 0.50);

        min.setModifier(ModifierType.Health, 10, 0, 0.10);
        max.setModifier(ModifierType.Health, 30, 0, 0.20);
        
        min.setModifier(ModifierType.HealthReg, 0, 0, 0.15);
        max.setModifier(ModifierType.HealthReg, 0, 0, 0.25);
        
        min.setModifier(ModifierType.Mana, 10, 0, 0.10);
        max.setModifier(ModifierType.Mana, 30, 0, 0.20);
        
        min.setModifier(ModifierType.ManaReg, 0, 0, 0.15);
        max.setModifier(ModifierType.ManaReg, 0, 0, 0.25);
        
        min.setModifier(ModifierType.MovementSpeed, 0, 0, 0.05);
        max.setModifier(ModifierType.MovementSpeed, 0, 0, 0.15);
        
        // min.setModifier(ModifierType.Range, 10, 0, 0);
        // max.setModifier(ModifierType.Range, 30, 0, 0);
        
        min.setModifier(ModifierType.ResourceCost, 0, 0, -0.10);
        max.setModifier(ModifierType.ResourceCost, 0, 0, -0.25);
    }

    private createModifierList() {
        const min = this.minModifierValues;
        const max = this.maxModifierValues;
        const length = min.modifiers.length;
        
        const modList = new Array<{ type: ModifierType, mod: number }>();

        for (let i = 0; i < length; i++) {
            const modMin = min.modifiers[i];
            const modMax = max.modifiers[i];

            if (modMin.flatAdditive !== modMax.flatAdditive) {
                modList.push({ type: modMin.key, mod: 0 });
            }
            if (modMin.percentAdditive !== modMax.percentAdditive) {
                modList.push({ type: modMin.key, mod: 1 });
            }
            if (modMin.percentMulti !== modMax.percentMulti) {
                modList.push({ type: modMin.key, mod: 2 });
            }
        }

        this.modifierList = modList;
    }


    // public static generateBreastarmor() {
    //     const armor = new BaseBodyarmor("Genamo", Rarity.Normal);
    //     armor.baseStats.armor = 60;

    //     const stats = armor.modifierStats;
    //     stats.setModifier(ModifierType.Armor, 0, 0, 0.2);
    //     stats.setModifier(ModifierType.Health, 5, 0.2, 0)
    //     stats.setModifier(ModifierType.FireDmg, 0, 0, -0.5);

    //     return armor;
    // }

    public getRandomRarity() {
        const randomNumber = this.rng.random();

        // Options: Common, Normal, Rare, Legendary
        if (randomNumber >= 0.99) return Rarity.Legendary;
        if (randomNumber >= 0.85) return Rarity.Rare;
        if (randomNumber >= 0.50) return Rarity.Normal;
        
        return Rarity.Common;
    }

    public getNumberOfModifiers(rarity: Rarity) {
        switch(rarity) {
            case Rarity.Common:
                return 0;
            case Rarity.Normal:
                return 2;
            case Rarity.Rare:
                return 4;
            case Rarity.Legendary:
                return 6;
        }

        return 0;
    }

    public createRandomEquipment() {
        const randomNumber = this.rng.randomRangeInt(0, 4);
        const rarity = this.getRandomRarity();
        const nrOfMods = this.getNumberOfModifiers(rarity);
        
        const mods = new Array<ModifierStats>();
        for (let i = 0; i < nrOfMods; i++) {
            mods.push(this.createModifier());
        }
        const stats = ModifierStats.merge(mods);

        switch (randomNumber) {
            case 0:
                return this.createBodyEquipment(rarity, stats);
            case 1:
                return this.createFootEquipment(rarity, stats);
            case 2:
                return this.createHandEquipment(rarity, stats);
            case 3:
                return this.createHeadEquipment(rarity, stats);
            default:
                return this.createWeapon(rarity, stats);
        }
    }

    private createBodyEquipment(rarity: Rarity, stats: ModifierStats) {
        const armor = new BaseBodyarmor("Bodyarmor", rarity);
        armor.modifierStats = stats;

        return armor
    }

    private createFootEquipment(rarity: Rarity, stats: ModifierStats) {
        const boots = new BaseBoots("Boots", rarity);
        boots.modifierStats = stats;

        return boots;
    }

    private createHandEquipment(rarity: Rarity, stats: ModifierStats) {
        const gauntlet = new BaseGauntlet("Gauntlet", rarity);
        gauntlet.modifierStats = stats;

        return gauntlet;
    }

    private createHeadEquipment(rarity: Rarity, stats: ModifierStats) {
        const helmet = new BaseHelmet("Helmet", rarity);
        helmet.modifierStats = stats;

        return helmet;
    }

    private createWeapon(rarity: Rarity, stats: ModifierStats) {
        const weapon = new BaseWeapon("Weapon", rarity);
        weapon.modifierStats = stats;

        return weapon;
    }


    private createModifier() {
        const maxIndex = this.modifierList.length - 1;
        const randomIndex = this.rng.randomRangeInt(0, maxIndex);

        const modType = this.modifierList[randomIndex];
        const minMod = this.minModifierValues.getModifier(modType.type);
        const maxMod = this.maxModifierValues.getModifier(modType.type);

        let min, max;
        let flatAdditive = 0, percentAdditive = 0, percentMulti = 0;
        if (modType.mod === 0) {
            min = minMod.flatAdditive;
            max = maxMod.flatAdditive;

            flatAdditive = this.rng.randomRangeInt(min, max);
        }
        else if (modType.mod === 1) {
            min = minMod.percentAdditive;
            max = maxMod.percentAdditive;

            percentAdditive = this.rng.randomRangeDouble(min, max);
        }
        else if (modType.mod === 2) {
            min = minMod.percentMulti;
            max = minMod.percentMulti;

            percentMulti = this.rng.randomRangeDouble(min, max);
        }

        const stats = new ModifierStats();
        stats.setModifier(modType.type, flatAdditive, percentMulti, percentAdditive);

        return stats;
    }

    public static createEquipment() {
        const factory = new EquipmentFactory();

        return factory.createRandomEquipment();
    }

    public static test() {
        const equipment = EquipmentFactory.createEquipment();

        console.log(equipment);
    }
}
