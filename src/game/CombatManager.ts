import { Game } from "game"
import { RNG } from "game/util"
import { Entity } from "game/entities"
import { Enemy } from "game/entities/enemies"
import { BaseAbility, AttackType } from "game/abilities/BaseAbility"
import { isLootable, Lootable } from "game/loot"


export class CombatManager {
    public game: Game;
    public rng: RNG;

    public combatLog: string[] = [];

    
    public constructor(game: Game) {
        this.game = game;
        this.rng = new RNG(Math.random);
    }

    public applyAbility(source: Entity, target: Entity, ability: BaseAbility, attackType: AttackType) {
        // const abilityStats = ability.calculatedStats;
        const abilityImpact = ability.calculateImpact(attackType, source);
        const targetStats = target.calculatedStats;

        let physDmg = abilityImpact.damage.phys;
        physDmg -= targetStats.physResistance;
        physDmg = Math.max(0, physDmg);
        let fireDmg = abilityImpact.damage.fire;

        const totalDmg = physDmg + fireDmg;

        // Apply buffs, debuffs
        target.buffManager.addBuff(...abilityImpact.buffs);
        

        // Combat state
        source.battleState.setBattleActive();
        target.battleState.setBattleActive();


        // Log
        if (totalDmg > 0) {
            this.combatLog.push("Tick " + this.game.tick + ": " + source.name + " attacked " + target.name + " with " + ability.name + " for " + totalDmg + " dmg (" + physDmg + " phys; " + fireDmg + " fire)");
            if (this.combatLog.length > 20) this.combatLog.shift();
        }
    
        targetStats.currentHealth -= totalDmg;
        if (targetStats.currentHealth <= 0) this.onKill(source, target);
    }

    private onKill(source: Entity, target: Entity) {
        target.onDeath();

        // Rewards
        if (isLootable(target)) {
            this.takeLoot(target);
        }

        if (target instanceof Enemy) {
            this.gainExp(target);
        }
    }

    private takeLoot(from: Lootable) {
        const player = this.game.player;
        const loot = from.getLoot();
        player.inventory.addAll(loot);
    }

    private gainExp(from: Enemy) {
        const player = this.game.player;
        const exp = from.calcExp();
        player.experience.add(exp);
    }
}
