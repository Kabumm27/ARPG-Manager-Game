import { Entity } from "./Entity";


export class Level {
	private entity: Entity;

	public currentExperience: number;
	public totalExperience: number;
	
	public current: number;
	public max: number;

	public levelBorders: number[];

	
	public constructor(entity: Entity, levelBorders: number[], maxLevel: number) {
		this.entity = entity;
		this.current = 1;
		this.currentExperience = 0;
		this.totalExperience = 0;

		this.max = maxLevel;
		this.levelBorders = levelBorders;
	}
	
	
	public add(exp: number) {
		if (this.current >= this.max) return; 

		this.currentExperience += exp;
		this.totalExperience += exp;

		const index = Math.min(this.levelBorders.length, this.current) - 1;
		if (index >= 0) {
			const expRequired = this.levelBorders[index];
			
			if (this.currentExperience >= expRequired) {
				// console.log("Level up!");
				this.current++;
				this.currentExperience -= expRequired;

				this.entity.onLevelUp(this.current);
			}
		}
	}
}