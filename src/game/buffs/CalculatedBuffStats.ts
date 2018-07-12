import { ModifierStats, ModifierType } from "game/stats"
import { BuffBaseStats } from "."


export class CalculatedBuffStats {
    public fireDmgMin: number;
    public fireDmgMax: number;
    public physDmgMin: number;
    public physDmgMax: number;

    public constructor() {
        this.recalculate(new BuffBaseStats(), new ModifierStats(), 1);
    }

    public recalculate(baseStats: BuffBaseStats, modifier: ModifierStats, multiplier: number) {
        this.fireDmgMin = modifier.apply(baseStats.fireDmgMin, ModifierType.FireDmg) * multiplier;
        this.fireDmgMax = modifier.apply(baseStats.fireDmgMax, ModifierType.FireDmg) * multiplier;
        this.physDmgMin = modifier.apply(baseStats.physDmgMin, ModifierType.PhysDmg) * multiplier;
        this.physDmgMax = modifier.apply(baseStats.physDmgMax, ModifierType.PhysDmg) * multiplier;
    }
}
