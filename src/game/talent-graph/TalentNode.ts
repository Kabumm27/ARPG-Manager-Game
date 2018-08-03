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


    public constructor(name: string, x: number, y: number, size?: string) {
        this.id = name.toLowerCase().replace(/\W/g, '_');
        this.name = name;
        this.stats = new ModifierStats();

        this.x = x;
        this.y = y;
        this.size = size || "small";

        this.active = false;
        this.locked = false;
    }
}