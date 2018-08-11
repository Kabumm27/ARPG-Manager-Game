import { Game } from "game"
import { Map } from "game/map"
import { Entity } from ".."
import { EnemyBattleState } from "."
import { RNG } from "game/util"
import { Lootable, Loot } from "game/loot"
import { EquipmentFactory } from "game/equipment/factory"
import { Timer } from "../Timer";


export class Enemy extends Entity implements Lootable {	
	
	public constructor(game: Game, map: Map, name: string, health: number, mana: number) {
		super(game, map, name, health, mana);

		this.baseStats.movementSpeed = 0.5;
		this.battleState = new EnemyBattleState(this);
	}

	
	public calcExp() {
		return this.level.current * 100;
	}

	public getLoot() {
		const loot = new Array<Loot>();

		if ((new RNG(Math.random)).random() > 0.8) {
			loot.push(EquipmentFactory.createEquipment());
		}

		return loot;
	}
	
	public update() {
		super.update();
		const player = this.game.player;
		const battleState = this.battleState;

		if (!battleState.isInBattle() && this.pos.distance(player.pos) <= 5) {
			battleState.setBattleActive();

			// Call reinforcements
			const enemies = this.game.enemyManager.enemies;
			for (const enemy of enemies) {
				if (this.pos.distance(enemy.pos) <= 2) {
					battleState.setBattleActive();
				}
			}
		}

		if (battleState.isInBattle()) {
			this.attackOrMove(player);
		}
	}
}
