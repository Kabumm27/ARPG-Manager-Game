import { BaseBuff } from ".."
import { ModifierType } from "game/stats"
import { Entity } from "game/entities"


export class BuffIncreasedFireDmg extends BaseBuff {


    public constructor(source: Entity) {
        super("Increased fire dmg", "No description...", source);

        this.duration = 1000 * 60 * 60;
        this.maxStacks = 3;

        this.modifierStats.setModifier(ModifierType.FireDmg, 0, 1, 0);
    }
}