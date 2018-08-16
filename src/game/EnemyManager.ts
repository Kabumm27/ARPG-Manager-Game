import { Game } from "game"
import { Map } from "game/map"
import { Enemy } from "game/entities/enemies"
import { Vector2, RNG } from "game/util"


export class EnemyManager {
	private game: Game;
	private map: Map;
	private rng: RNG;
	
	public enemies: Enemy[];
	

	public constructor(game: Game, map: Map) {
		this.map = map;
		this.game = game;
		this.rng = new RNG(Math.random);

		this.enemies = new Array();
	}
	
	public update() {
		for (let i = 0; i < this.enemies.length; i++) {
			const enemy = this.enemies[i];
			enemy.update();
			
			if (enemy.isDead) {
				enemy.onDestroy();
				this.enemies.splice(i, 1);
				i--; // reset index and don't skip elements
			}
		}
		
		if (this.enemies.length <= 2) {
			const enemy = new Enemy(this.game, this.map, "Monster", 10, 0);
			let x, y;
			do {
				x = this.rng.randomRangeInt(0, this.map.width - 1);
				y = this.rng.randomRangeInt(0, this.map.height - 1);
			} while (!this.map.isPositionFree(x, y));
			enemy.pos.set(x, y);
			this.enemies.push(enemy);
		}
	}
}
