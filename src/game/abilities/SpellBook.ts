import { Game } from "../Game"
import { Entity, Timer } from "../entities"
import { BaseWeapon } from "../equipment/weapons"

import { BaseAbility, AbilityTimer, AbilityRotation } from "."
import { BasicAttack, FireBall, IceBlast,  FireBlast } from "./spells"

// TODO: clean up (loop over enum)
export class SpellBook {
    public game: Game;
    public entity: Entity;

    public defaultAttack: AbilityRotation;
    public defaultAttackTimer: AbilityTimer;

    public mainAttack: AbilityRotation;
    public mainAttackTimer: AbilityTimer;


    public constructor(game: Game, entity: Entity) {
        this.game = game;
        this.entity = entity;

        this.defaultAttack = new AbilityRotation([new BasicAttack()]);
        this.mainAttack = new AbilityRotation();

        this.defaultAttackTimer = new AbilityTimer();
        this.mainAttackTimer = new AbilityTimer();
    }

    public update() {
        let ability: BaseAbility;
        let threshold: number;

        this.updateAbility(SpellSlot.DefaultAttack, this.defaultAttackTimer);
        this.updateAbility(SpellSlot.MainAttack, this.mainAttackTimer);
    }

    private updateAbility(slot: SpellSlot, timer: AbilityTimer) {
        const ability = this.getAbility(slot);
        if (ability) {
            const threshold = ability.calculatedStats.atkThreshold;
            timer.add(Timer.deltaTime, threshold);
        }
    }

    public getRotation(slot: SpellSlot) {
        switch (slot) {
            case SpellSlot.DefaultAttack:
                return this.defaultAttack;
            case SpellSlot.MainAttack:
                return this.mainAttack;
        }

        throw new Error("Spell not found");
    }

    public getAbility(slot: SpellSlot) {
        return this.getRotation(slot).getCurrent();
    }

    public getTimer(slot: SpellSlot) {
        switch (slot) {
            case SpellSlot.DefaultAttack:
                return this.defaultAttackTimer;
            case SpellSlot.MainAttack:
                return this.mainAttackTimer;
        }

        throw new Error("Timer not found");
    }

    public isCooledDown(slot: SpellSlot) {
        const ability = this.getAbility(slot);
        const timer = this.getTimer(slot);
        
        return ability.calculatedStats.atkThreshold <= timer.value;
    }

    public hasResources(slot: SpellSlot) {
        const ability = this.getAbility(slot);
        const manaCost = ability.calculatedStats.manaCost;
        const entityCurrentMana = this.entity.calculatedStats.currentMana;

        return manaCost <= entityCurrentMana;
    }

    public takeResources(slot: SpellSlot) {
        // reset timer
        const timer = this.getTimer(slot);
        timer.value = 0;

        // take resources
        const ability = this.getAbility(slot);
        const abilityStats = ability.calculatedStats;
        const entityStats = this.entity.calculatedStats;

        entityStats.currentMana -= abilityStats.manaCost;

        // next in rotation
        const rotation = this.getRotation(slot);
        rotation.next();
    }

    public getAvailableAbilities() {
        return {
            "basicAttack": new BasicAttack(),
            "fireBall": new FireBall(),
            "iceBlast": new IceBlast(),
            "fireBlast": new FireBlast()
        }
    }

    public equipAbility(ability: BaseAbility[], slot: SpellSlot) {
        // TODO: Implement actual rotation
        switch (slot) {
            case SpellSlot.DefaultAttack:
                this.defaultAttack.setRotation(ability);
                break;
            case SpellSlot.MainAttack:
                this.mainAttack.setRotation(ability);
                break;
            default:
                return;
        }

        this.recalculateStats();
    }

    public recalculateStats() {
        const weapon = this.entity.gear.weapon || BaseWeapon.default();
        this.defaultAttack.recalculateStats(weapon, this.entity.cachedModifierStats);
        this.mainAttack.recalculateStats(weapon, this.entity.cachedModifierStats);
    }
}

export enum SpellSlot {
    DefaultAttack,
    MainAttack
}
