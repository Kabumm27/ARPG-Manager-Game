import { BaseAbility, AbilityImpact } from ".."
import { Entity } from "game/entities"
import { FireDot } from "game/buffs/debuffs"


export class FireBlast extends BaseAbility {
    
    public constructor() {
        super("Fire Blast");

        this.baseStats.bonusRange = 1;
        this.baseStats.aoeRange = 3;

        this.baseStats.fireDmgMin = 1;
        this.baseStats.fireDmgMax = 2;
        this.baseStats.fireDmgMulti = 1;

        this.baseStats.cooldown = 750;
    }

    
    protected calculatePrimaryImpact(source: Entity) {
        const stats = this.calculatedStats;
        const dot = new FireDot(source);

        return <AbilityImpact>{
            damage: {
                fire: 0,
                phys: 0
            },
            buffs: [ dot ]
        }
    }

    protected calculateSecondaryImpact(source: Entity) {
        const stats = this.calculatedStats;
        const dot = new FireDot(source);

        return <AbilityImpact>{
            damage: {
                fire: 0,
                phys: 0
            },
            buffs: [ dot ]
        }
    }

}