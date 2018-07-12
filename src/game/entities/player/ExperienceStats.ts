

export class ExperienceStats {
	public currentExperience: number;
	public totalExperience: number;
	
	public level: number;
	public maxLevel: number;

	public levelBorders: number[];

	
	public constructor(levelBorders: number[], maxLevel: number) {
		this.level = 1;
		this.currentExperience = 0;
		this.totalExperience = 0;

		this.maxLevel = maxLevel;
		this.levelBorders = levelBorders;
	}
	
	
	public add(exp: number) {
		if (this.level >= this.maxLevel) return; 

		this.currentExperience += exp;
		this.totalExperience += exp;

		const index = Math.min(this.levelBorders.length, this.level) - 1;
		const expRequired = this.levelBorders[index];
		
		if (this.currentExperience >= expRequired) {
			// console.log("Level up!");
			this.level++;
			this.currentExperience -= expRequired;
		}
	}
}