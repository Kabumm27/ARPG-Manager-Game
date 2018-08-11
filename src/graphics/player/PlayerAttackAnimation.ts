import { BaseAnimation, Keyframe, AnimationState } from "../animation";
import { Vector2 } from "game/util";


export class PlayerAttackAnimation extends BaseAnimation {
    
    public constructor(animationState: AnimationState) {
        super(animationState);
        
        this.keyframes.push(new Keyframe([{
            target: "position-x",
            from: 0,
            to: 0.2
        }], 100));

        this.keyframes.push(new Keyframe([{
            target: "position-x",
            from: 0.2,
            to: 0
        }], 100));

        this.totalDuration = 200;
    }
}
