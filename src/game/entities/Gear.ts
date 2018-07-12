import { Game } from "game"
import { Entity } from "."
import { ModifierStats } from "game/stats"
import { Equipment, EquipmentBaseStats, EquipmentSlot } from "game/equipment"
import { BaseBoots } from "game/equipment/feet"
import { BaseBodyarmor } from "game/equipment/body"
import { BaseGauntlet } from "game/equipment/hands"
import { BaseHelmet } from "game/equipment/head"
import { BaseWeapon, Fists } from "game/equipment/weapons"


export class Gear {
    public game: Game;
    public entity: Entity

    public boots: BaseBoots;
    public bodyarmor: BaseBodyarmor;
    public gauntlet: BaseGauntlet;
    public helmet: BaseHelmet;
    public weapon: BaseWeapon;

    public cachedModifierStats: ModifierStats;
    public cachedBaseStats: EquipmentBaseStats;

    public constructor(game: Game, entity: Entity) {
        this.game = game;
        this.entity = entity;

        this.boots = null;
        this.bodyarmor = null;
        this.gauntlet = null;
        this.helmet = null;
        this.weapon = null;

        this.cachedModifierStats = new ModifierStats();
        this.cachedBaseStats = new EquipmentBaseStats();
    }
    
    public equip(slot: GearSlot, equipment: Equipment) {
        // Remove equipment from inventory
        const success = this.entity.inventory.removeItem(equipment);
        if (equipment !== null && !success) return; // throw Error("Equipment not available");

        // Unequip old and equip new
        switch (slot) {
            case GearSlot.Boots:
                if (this.boots) this.entity.inventory.add(this.boots);
                this.boots = equipment as BaseBoots;
                break;
            case GearSlot.Helmet:
                if (this.helmet) this.entity.inventory.add(this.helmet);
                this.helmet = equipment as BaseHelmet;
                break;
            case GearSlot.Gauntlet:
                if (this.gauntlet) this.entity.inventory.add(this.gauntlet);
                this.gauntlet = equipment as BaseGauntlet;
                break;
            case GearSlot.Bodyarmor:
                if (this.bodyarmor) this.entity.inventory.add(this.bodyarmor);
                this.bodyarmor = equipment as BaseBodyarmor;
                break;
            case GearSlot.Weapon:
                if (this.weapon) this.entity.inventory.add(this.weapon);
                this.weapon = equipment as BaseWeapon;
                break;
        }

        // Recalculate stats
        this.recalculateStats();
        this.entity.recalculateStats();
    }

    public fastEquip(equipment: Equipment) {
        switch (equipment.slot) {
            case EquipmentSlot.Feet: return this.equip(GearSlot.Boots, equipment);
            case EquipmentSlot.Head: return this.equip(GearSlot.Helmet, equipment);
            case EquipmentSlot.Hands: return this.equip(GearSlot.Gauntlet, equipment);
            case EquipmentSlot.Body: return this.equip(GearSlot.Bodyarmor, equipment);
            case EquipmentSlot.Weapon: return this.equip(GearSlot.Weapon, equipment);
            default: throw Error("Invalid equipment slot");
        }
    }

    public magicEquip(slot: GearSlot, equipment: Equipment) {
        this.entity.inventory.add(equipment);
        this.equip(slot, equipment);
    }


    public unequip(slot: GearSlot) {
        this.equip(slot, null);
    }

    public get(slot: GearSlot) {
        switch(slot) {
            case GearSlot.Boots: return this.boots;
            case GearSlot.Bodyarmor: return this.bodyarmor;
            case GearSlot.Gauntlet: return this.gauntlet;
            case GearSlot.Helmet: return this.helmet;
            case GearSlot.Weapon: return this.weapon;
        }

        return null;
    }

    public recalculateStats() {
        const modifierStats = [];
        const equipmentBaseStats = [];
        
        if (this.boots) {
            modifierStats.push(this.boots.modifierStats);
            equipmentBaseStats.push(this.boots.baseStats);
        }
        if (this.helmet) {
            modifierStats.push(this.helmet.modifierStats);
            equipmentBaseStats.push(this.helmet.baseStats);
        }
        if (this.gauntlet) {
            modifierStats.push(this.gauntlet.modifierStats);
            equipmentBaseStats.push(this.gauntlet.baseStats);
        }
        if (this.bodyarmor) {
            modifierStats.push(this.bodyarmor.modifierStats);
            equipmentBaseStats.push(this.bodyarmor.baseStats);
        }
        if (this.weapon) {
            modifierStats.push(this.weapon.modifierStats);
            equipmentBaseStats.push(this.weapon.baseStats);
        }

        this.cachedModifierStats = ModifierStats.merge(modifierStats);
        this.cachedBaseStats = EquipmentBaseStats.merge(equipmentBaseStats);
    }
}

export enum GearSlot {
    Boots,
    Helmet,
    Gauntlet,
    Bodyarmor,
    Weapon
}
