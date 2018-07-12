import { Entity, BattleState } from ".."


export class EnemyBattleState extends BattleState {
    private engaged: boolean;

    public constructor(entity: Entity) {
        super(entity);
        
        this.engaged = false;
    }

    public setBattleActive() {
        this.inBattle = true;
        this.engaged = true;
    }

    public isInBattle() {
        return this.engaged;
    }
}