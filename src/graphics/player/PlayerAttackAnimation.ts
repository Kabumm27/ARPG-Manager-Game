import { BaseAnimation, Keyframe, AnimationState } from "../animation";
import { Vector2 } from "game/util";


export class PlayerAttackAnimation extends BaseAnimation {
    
    public constructor(animationState: AnimationState) {
        super(animationState, "PlayerAttack", "attack");
        
        this.addKeyframe(new Keyframe([{
            target: "position-x",
            from: 0,
            to: 8
        }], 50));

        this.addEvent("attack-hit", 50);

        this.addKeyframe(new Keyframe([{
            target: "position-x",
            from: 8,
            to: 0
        }], 50));
    }
}
