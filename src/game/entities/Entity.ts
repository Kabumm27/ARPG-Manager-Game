import { Vector2 } from "game/util"
import { Game } from "game"
import { Graphics, IDrawable } from "graphics/base";
import { Map } from "game/map"
import { ModifierStats } from "game/stats"
import { EntityBaseStats, CalculatedEntityStats, Gear, Inventory, BattleState, Level } from "."
import { BaseAbility, SpellBook, SpellSlot, AttackType } from "game/abilities"
import { BuffManager } from "game/buffs"
import { TalentGraph } from "../talent-graph";
import { Timer } from "./Timer";


export class Entity implements IDrawable {
	public game: Game;
	public map: Map;
	public name: string;

	public isDead: boolean;
	public passthrough: boolean;

	public battleState: BattleState;
	public graphics: Graphics;
    
	public pos: Vector2;
	public dir: Vector2;
	
	public level: Level;
	public gear: Gear;
	public inventory: Inventory;
	
	public baseStats: EntityBaseStats;
	public modifierStats: ModifierStats;
	public cachedModifierStats: ModifierStats;
	public calculatedStats: CalculatedEntityStats;

	public buffManager: BuffManager;
	public spellBook: SpellBook;
	public talentGraph: TalentGraph;
	

	public constructor(game: Game, map: Map, name: string, health: number, mana: number) {
		this.game = game;
		this.map = map;
		this.name = name;
		this.pos = new Vector2(0, 0);
		this.dir = new Vector2(1, 0);

		this.isDead = false;
		this.passthrough = false;
		this.battleState = new BattleState(this);
		this.graphics = new Graphics(this.game, this);

		this.level = new Level(this, [], 1);
		this.gear = new Gear(this.game, this);
		this.inventory = new Inventory(this.game, this);
		
		this.baseStats = new EntityBaseStats(health, mana);
		this.modifierStats = new ModifierStats();
		this.cachedModifierStats = new ModifierStats();
		this.calculatedStats = new CalculatedEntityStats(this.baseStats, this.gear.cachedBaseStats, this.modifierStats);

		this.buffManager = new BuffManager(game, this);
		this.spellBook = new SpellBook(game, this);
		this.talentGraph = new TalentGraph(this);

		this.map.add(this);

		this.recalculateStats();
	}
	
	public update() {
		const stats = this.calculatedStats;

		// Regeneration
		stats.currentMana = Math.min(stats.mana, stats.currentMana + stats.manaReg * Timer.deltaTimeMulti);
		stats.currentHealth = Math.min(stats.health, stats.currentHealth + stats.healthReg * Timer.deltaTimeMulti);

		this.buffManager.update();
		this.battleState.update();
		this.graphics.update();
	}
	
	public recalculateStats() {
		// TODO: Call max once per update!
		const modifierStats = [];
		modifierStats.push(this.modifierStats);
		modifierStats.push(this.gear.cachedModifierStats);
		modifierStats.push(this.buffManager.cachedModifierStats);
		modifierStats.push(this.talentGraph.cachedModifierStats);

		this.cachedModifierStats = ModifierStats.merge(modifierStats);
		this.calculatedStats.calculate(this.baseStats, this.gear.cachedBaseStats, this.cachedModifierStats);
		this.spellBook.recalculateStats();
	}

	public attackOrMove(target: Entity) {
		let hasAttacked = false;
		let tryDefaultAttack = false;

		// Turn to target
		// this.dir = target.pos.clone().minus(this.pos).normalize();
		this.dir.copyFrom(target.pos).minus(this.pos).normalize();

		// Main attack
		const slot = SpellSlot.MainAttack;
		const ability = this.spellBook.getAbility(slot);
		let range;
		
		if (ability) {
			range = ability.calculatedStats.range;
			if (this.pos.distance(target.pos) <= range) {
				if (this.spellBook.isCooledDown(slot)) {
					if (this.spellBook.hasResources(slot)) {
						this.spellBook.takeResources(slot);
						this.graphics.animation.registerEvent("attack-hit", () => {
							this.game.combatManager.applyAbility(this, target, ability, AttackType.Primary);

							// Area of Effect
							if (ability.baseStats.aoeRange > 0) {
								const aoeEntities = this.map.getEnemiesInRange(target.pos.x, target.pos.y, ability.baseStats.aoeRange);
								for (const entity of aoeEntities) {
									if (entity !== target) {
										this.game.combatManager.applyAbility(this, entity, ability, AttackType.Secondary);
									}
								}
							}
						});
						this.graphics.animation.changeAnimation("attack");

						hasAttacked = true;
					}
					else {
						tryDefaultAttack = true;
					}
				}
			}
		}
		else {
			tryDefaultAttack = true;
		}

		// If main attack can't be used, try default attack
		if (tryDefaultAttack) {
			const slot = SpellSlot.DefaultAttack;
			const ability = this.spellBook.getAbility(slot);
			if (ability) {
				range = ability.calculatedStats.range; // update range for default attack
				if (this.pos.distance(target.pos) <= range) {
					if (this.spellBook.isCooledDown(slot)) {
						if (this.spellBook.hasResources(slot)) {
							this.spellBook.takeResources(slot);
							this.graphics.animation.registerEvent("attack-hit", () => {
								this.game.combatManager.applyAbility(this, target, ability, AttackType.Primary);
							});
							this.graphics.animation.changeAnimation("attack");

							hasAttacked = true;
						}
					}
				}
			}
		}

		// If still not attacked, move
		if (!hasAttacked) {
			if (this.pos.distance(target.pos) > range) {
				// this.timer.movementTimer += dt;
				// const movementThreshold = 100 / this.calculatedStats.movementSpeed;
				// if (this.timer.movementTimer >= movementThreshold) {
				// 	this.timer.movementTimer -= movementThreshold;
				// 	this.moveTo(target.pos.x, target.pos.y);
				// }
				this.moveToEntity(target);
			}
		}
	}

	public moveTo(x: number, y: number) {
		const targetPos = new Vector2(x, y);

		if (this.pos.distance(targetPos) > 1) {
			// move
			if (targetPos.y < this.pos.y) {
				this.pos.y -= 1;
			}
			else if (targetPos.y > this.pos.y) {
				this.pos.y += 1;
			}
			else if (targetPos.x < this.pos.x) {
				this.pos.x -= 1;
			}
			else if (targetPos.x > this.pos.x) {
				this.pos.x += 1;
			}
		}
	}

	public moveToEntity(entity: Entity) {
		const movement = this.calculatedStats.movementSpeed * Timer.deltaTimeMulti;

		const deltaX = entity.pos.x - this.pos.x;
		const deltaY = entity.pos.y - this.pos.y;
		const length = Math.sqrt(deltaX**2 + deltaY**2);

		this.pos.x += deltaX / length * movement;
		this.pos.y += deltaY / length * movement;
	}

	public onLevelUp(level: number) {
		this.talentGraph.onLevelUp(level);
	}

	public onDeath() {
		this.isDead = true;
		this.passthrough = true;
	}

	public onDestroy() {
		this.game.rackdollManager.spawn(this.pos.clone());
		this.map.remove(this);
	}
}

export enum EntityType {
	Friendly,
	Weak,
	Normal,
	Rare,
	Epic,
	Legendary,
	Boss
}
