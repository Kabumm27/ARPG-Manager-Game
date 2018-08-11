import { Entity } from "."


export class BattleState {
    protected entity: Entity;

    protected inBattle: boolean;
    protected wasInBattle: boolean;


    public constructor(entity: Entity) {
        this.entity = entity;
        
        this.inBattle = false;
        this.wasInBattle = false;
    }


    public update() {
        this.wasInBattle = this.inBattle;
        this.inBattle = false;
    }

    public setBattleActive() {
        this.inBattle = true;
    }

    public isInBattle() {
        return this.wasInBattle;
    }
}