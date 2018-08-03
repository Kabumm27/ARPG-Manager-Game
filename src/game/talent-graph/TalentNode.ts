import { ModifierStats } from "game/stats"


export class TalentNode {
    public id: string;
    public name: string;
    public stats: ModifierStats;

    public x: number;
    public y: number;
    public size: string;

    public active: boolean;
    public locked: boolean;
    
    public prerequisites: TalentNode[];


    public constructor(name: string, x: number, y: number, size?: string) {
        this.name = name;
        this.id = name.toLowerCase().replace(" ", "_");
        this.prerequisites = [];

        this.x = x;
        this.y = y;
        this.size = size || "small";

        this.active = false;
        this.locked = false;
    }

    public setPrerequisites(...prerequisites: TalentNode[]) {
        this.prerequisites = prerequisites;
    }
}