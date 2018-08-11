import { Entity, GearSlot } from "game/entities"
import { Enemy } from "game/entities/enemies"
import { BuffIncreasedFireDmg } from "game/buffs/buffs"
import { Game } from "game"
import { Map } from "game/map"
import { BaseWeapon, Bow, Sword } from "game/equipment/weapons"
import { SpellBook, SpellSlot } from "game/abilities"
import { BasicAttack, FireBall } from "game/abilities/spells"
import { PlayerIdleAnimation } from "graphics/player/PlayerIdleAnimation";
import { PlayerAttackAnimation } from "graphics/player";


export class PlayerCharacter extends Entity {	
	
	public constructor(game: Game, map: Map, name: string, health: number, mana: number) {
		super(game, map, name, health, mana);

		this.graphics.animation.idle = new PlayerIdleAnimation(this.graphics.animation);
		this.graphics.animation.attack = new PlayerAttackAnimation(this.graphics.animation);
		
		this.baseStats.movementSpeed = 1.5;
		this.level.max = 99;
		this.level.levelBorders = new Array<number>(this.level.max).fill(0).map((v, i) => 1000 * (1.1**i));

		const availableAbilities = this.spellBook.getAvailableAbilities();
		// this.spellBook.equipAbility([availableAbilities.fireBall, availableAbilities.iceBlast], SpellSlot.MainAttack);
		this.spellBook.equipAbility([availableAbilities.basicAttack], SpellSlot.MainAttack)

		this.gear.magicEquip(GearSlot.Weapon, new Sword());
		// this.buffManager.addBuff(new BuffIncreasedFireDmg(this), new BuffIncreasedFireDmg(this));
	}
	
	public update() {
		super.update();

		this.spellBook.update();
		const enemies = this.game.enemyManager.enemies;

		if (enemies.length > 0) {
			const target = this.selectTarget(enemies, TargetSelection.Lowest);
			this.attackOrMove(target);
		}
	}

	private selectTarget(enemies: Enemy[], selection: TargetSelection) {
		let target = null;

		switch (selection) {
			case TargetSelection.First:
				target = this.selectFirstTarget(enemies);
				break;
			case TargetSelection.Nearest:
				target = this.selectNearestTarget(enemies);
				break;
			case TargetSelection.Healthiest:
				target = this.selectHealthiestTarget(enemies);
				break;
			case TargetSelection.Lowest:
				target = this.selectLowestTarget(enemies);
		}

		// If no target found, get nearest
		if (!target) {
			target = this.selectNearestTarget(enemies);
		}

		return target;
	}

	private selectFirstTarget(enemies: Enemy[]) {
		if (enemies.length > 0) {
			return enemies[0];
		}

		return null;
	}

	private selectNearestTarget(enemies: Enemy[]) {
		let distance = Number.MAX_VALUE;
		let selectedEnemy: Enemy = null;

		for (const enemy of enemies) {
			const enemyDistance = this.pos.distance(enemy.pos);
			if (enemyDistance < distance) {
				distance = enemyDistance;
				selectedEnemy = enemy;
			} 
		}

		return selectedEnemy;
	}

	private selectHealthiestTarget(enemies: Enemy[]) {
		let health = 0;
		let selectedEnemy: Enemy = null;

		for (const enemy of enemies) {
			if (enemy.battleState.isInBattle()) {
				const enemyHealth = enemy.calculatedStats.currentHealth;
				if (enemyHealth > health) {
					health = enemyHealth;
					selectedEnemy = enemy;
				} 
			}
		}

		return selectedEnemy;
	}

	private selectLowestTarget(enemies: Enemy[]) {
		let health = Number.MAX_VALUE;
		let selectedEnemy: Enemy = null;
		let distance = Number.MAX_VALUE;

		for (const enemy of enemies) {
			if (enemy.battleState.isInBattle()) {
				const enemyHealth = enemy.calculatedStats.currentHealth;
				const enemyDistance = this.pos.distance(enemy.pos);
				if (enemyHealth < health) {
					health = enemyHealth;
					selectedEnemy = enemy;
					distance = enemyDistance;
				}
				// With equal health select closest enemy
				else if (enemyHealth === health) {
					if (enemyDistance < distance) {
						selectedEnemy = enemy;
						distance = enemyDistance;
					}
				}
			}
		}

		return selectedEnemy;
	}
}

export enum TargetSelection {
	First,
	Nearest,
	Strongest,
	Healthiest,
	Lowest
}