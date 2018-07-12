import { EquipmentBaseStats } from "../."


export class WeaponBaseStats extends EquipmentBaseStats {
    public physDmgMin: number;
    public physDmgMax: number;
    public fireDmgMin: number;
    public fireDmgMax: number;

    public atkSpd: number;
    public range: number;


    public constructor() {
        super();

        this.physDmgMin = 0;
        this.physDmgMax = 0;
        this.fireDmgMin = 0;
        this.fireDmgMax = 0;

        this.atkSpd = 1;
        this.range = 1;
    }
}