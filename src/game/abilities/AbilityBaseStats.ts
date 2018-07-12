export class AbilityBaseStats {
    public weaponDmgMulti: number;
    public weaponAtkSpdMulti: number;
    public weaponRangeMulti: number;

    public bonusRange: number;
    public aoeRange: number;
    
    public physDmgMin: number;
    public physDmgMax: number;
    public physDmgMulti: number;

    public fireDmgMin: number;
    public fireDmgMax: number;
    public fireDmgMulti: number;

    public healthCost: number;
    public manaCost: number;

    public cooldown: number;


    public constructor() {
        this.weaponDmgMulti = 0;
        this.weaponAtkSpdMulti = 0;
        this.weaponRangeMulti = 0;

        this.bonusRange = 0;
        this.aoeRange = 0;

        this.physDmgMin = 0;
        this.physDmgMax = 0;
        this.physDmgMulti = 0;

        this.fireDmgMin = 0;
        this.fireDmgMax = 0;
        this.fireDmgMulti = 0;

        this.healthCost = 0;
        this.manaCost = 0;

        this.cooldown = 0;
    }
}