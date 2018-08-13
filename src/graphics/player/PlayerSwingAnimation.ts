import { BaseAnimation, Keyframe, AnimationState } from "../animation";
import { Vector2 } from "game/util";


export class PlayerSwingAnimation extends BaseAnimation {
    
    public constructor(animationState: AnimationState) {
        super(animationState, "PlayerSwing", "attack");
        
        this.addKeyframe(new Keyframe([{
            target: "rotation",
            from: -50,
            to: 90
        }], 400));

        this.addEvent("attack", 50);

        // this.addKeyframe(new Keyframe([{
        //     target: "rotation",
        //     from: 0.2,
        //     to: 0
        // }], 50));
    }
}
