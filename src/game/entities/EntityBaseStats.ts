

export class EntityBaseStats {
    public health: number;
    public mana: number;

    public healthReg: number;
    public manaReg: number;

    public movementSpeed: number;

    public int: number;
    public dex: number;
    public str: number;


    public constructor(health: number, mana: number) {
        this.health = health;
        this.mana = mana;

        this.healthReg = 0.5;
        this.manaReg = 1;

        this.movementSpeed = 1;

        this.int = 10;
        this.dex = 10;
        this.str = 10;
    }
}