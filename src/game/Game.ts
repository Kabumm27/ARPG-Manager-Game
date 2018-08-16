import { Map } from "game/map"
import { PlayerCharacter } from "game/entities/player"
import { EnemyManager, CombatManager } from "."
import { RackdollManager } from "./rackdolls";
import { Timer } from "./entities";
import { Camera } from "graphics/camera/Camera";


export class Game {
	public map: Map;
	public camera: Camera;
	public player: PlayerCharacter;
	public enemyManager: EnemyManager;
	public combatManager: CombatManager;
	public rackdollManager: RackdollManager;
	
	public pause: boolean = true;
	private lastUpdate: number;
	
	public tick: number;

	public externalRedraw: () => void;

	
	public constructor() {
		this.map = new Map(this, 800, 450);
		this.enemyManager = new EnemyManager(this, this.map);
		this.combatManager = new CombatManager(this);
		this.player = new PlayerCharacter(this, this.map, "Player", 100, 100);
		this.camera = new Camera(this, this.player);

		this.rackdollManager = new RackdollManager(this);

		this.tick = 0;
		
		this.gameStart();
	}
	
	public gameStart() {
		this.lastUpdate = Date.now();
		this.gameLoop();
	}

	public tooglePause() {
		this.pause = !this.pause;
		
		// console.log("Pausestate:", this.pause);
	}
	
	public gameLoop() {
		requestAnimationFrame(() => this.gameLoop());
		if (this.pause) return;
		
		const currentTime = Date.now();
		const deltaTime = Math.min(currentTime - this.lastUpdate, 100);
		this.lastUpdate = currentTime;

		Timer.deltaTime = deltaTime;
		Timer.deltaTimeMulti = deltaTime / 1000;
		Timer.gameTime += deltaTime;
		
		this.update();
		
		// console.log("GameLoop - End");

		if (this.externalRedraw) {
			this.externalRedraw();
		}
	}

	// Debug function
	public test() {
		
	}
	
	public update() {
		this.enemyManager.update();
		this.player.update();
		if (this.rackdollManager.isEnabled) this.rackdollManager.update();

		this.tick++;
	}
}