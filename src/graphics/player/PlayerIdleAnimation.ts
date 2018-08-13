import { BaseAnimation, AnimationState } from "../animation";
import { Vector2 } from "game/util";


export class PlayerIdleAnimation extends BaseAnimation {

    public constructor(animationState: AnimationState) {
        super(animationState, "PlayerIdle", "idle");
        
    }
}
