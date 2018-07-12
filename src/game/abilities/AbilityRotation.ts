import { BaseAbility } from "."
import { DummyAbility } from "./spells"
import { BaseWeapon } from "../equipment/weapons"
import { ModifierStats } from "../stats"


export class AbilityRotation {
    public abilities: BaseAbility[];
    public currentIndex: number;

    public constructor(rotation: BaseAbility[] = []) {
        this.currentIndex = 0;
        this.abilities = rotation;
    }

    public getCurrent() {
        if (this.abilities.length === 0) return null;
        
        return this.abilities[this.currentIndex];
    }

    public next() {
        this.currentIndex++;
        if (this.currentIndex >= this.abilities.length) {
            this.currentIndex = 0;
        }

        return this.getCurrent();
    }

    public setRotation(rotation: BaseAbility[]) {
        this.abilities = rotation;
    }

    public recalculateStats(weapon: BaseWeapon, globalModifierStats: ModifierStats) {
        for (const ability of this.abilities) {
            ability.recalculate(weapon, globalModifierStats);
        }
    }
}