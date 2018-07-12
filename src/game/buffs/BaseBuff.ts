import { ModifierStats } from "game/stats"
import { BaseAbility } from "game/abilities"
import { Entity } from "game/entities"
import { BuffBaseStats, CalculatedBuffStats } from "."

// TODO: Tick timer
export class BaseBuff {
    public name: string;
    public id: string;

    public source: Entity;

    public description: string;

    public duration: number;
    public maxStacks: number;
    
    public baseStats: BuffBaseStats;
    public modifierStats: ModifierStats;
    public calculatedStats: CalculatedBuffStats;

    public ability: BaseAbility;


    public constructor(name: string, description: string, source: Entity) {
        this.name = name;
        this.id = name.toLocaleLowerCase().replace(/ /g, "");
        this.source = source;

        this.description = description;

        this.baseStats = new BuffBaseStats();
        this.modifierStats = new ModifierStats();
        this.calculatedStats = new CalculatedBuffStats();

        this.ability = null;

        this.duration = 0;
        this.maxStacks = 1;
    }

    public doesDamage() {
        const cs = this.calculatedStats;
        return cs.physDmgMax > 0 || cs.fireDmgMax > 0;
    }
}
