import { ModifierStats } from "game/stats"


export class Passive {
    public name: string;
    public stats: ModifierStats;

    public x: number;
    public y: number;

    public activated: boolean;
    
    public prerequisites: Passive[];


    public constructor(name: string) {
        this.name = name;
        this.prerequisites = [];
    }

    public setPrerequisites(...prerequisites: Passive[]) {
        this.prerequisites = prerequisites;
    }
}