import { Game } from "game"
import { Entity } from "game/entities"
import { AttackType } from "game/abilities"
import { BasicDot } from "game/abilities/spells/buffspells"
import { BaseBuff, ActiveBuff } from "."
import { ModifierStats } from "game/stats"


export class BuffManager {
    public game: Game;
    public entity: Entity;

    public buffs: Map<string, ActiveBuff>;
    public cachedModifierStats: ModifierStats;


    public constructor(game: Game, entity: Entity) {
        this.game = game;
        this.entity = entity;

        this.buffs = new Map<string, ActiveBuff>();
        this.cachedModifierStats = new ModifierStats();
    }

    public update(dt: number) {
        let buffsHaveChanged = false;

        for (const activeBuff of this.buffs.values()) {
            activeBuff.duration -= dt;
            if (activeBuff.duration <= 0) {
                this.buffs.delete(activeBuff.buff.id);
                buffsHaveChanged = true;
            }
        }

        if (buffsHaveChanged) {
            this.recalculateStats();
        }

        for (const activeBuff of this.buffs.values()) {
            const buff = activeBuff.buff;

            if (buff.ability) {
                const ability = buff.ability;
                const cooldown = ability.calculatedStats.cooldown;
                
                if (activeBuff.abilityTimer >= cooldown) {
                    this.game.combatManager.applyAbility(buff.source, this.entity, ability, AttackType.Primary);
                    activeBuff.abilityTimer -= cooldown;
                }

                activeBuff.abilityTimer += dt;
            }
        }
    }

    public addBuff(...newBuffs: BaseBuff[]) {
        for (const newBuff of newBuffs) {
            const activeBuff = this.buffs.get(newBuff.id);

            if (activeBuff) {
                const buff = activeBuff.buff;
                activeBuff.duration = buff.duration;
                if (activeBuff.stacks < buff.maxStacks) activeBuff.stacks++;
                
                buff.calculatedStats.recalculate(buff.baseStats, this.entity.modifierStats, activeBuff.stacks);

                // TODO: Recalculate buff ability
            }
            else {
                const activeBuff = new ActiveBuff(newBuff);
                const buff = activeBuff.buff;
                this.buffs.set(newBuff.id, activeBuff);

                buff.calculatedStats.recalculate(buff.baseStats, this.entity.modifierStats, activeBuff.stacks);
            }
        }
        
        this.recalculateStats();
    }
    
    public recalculateStats() {
        const buffModifierStats = new Array<ModifierStats>();
        for (const activeBuff of this.buffs.values()) {
            for (let i = 0; i < activeBuff.stacks; i++) {
                buffModifierStats.push(activeBuff.buff.modifierStats);
            }
        }

        this.cachedModifierStats = ModifierStats.merge(buffModifierStats);
        this.entity.recalculateStats();
    }

}
