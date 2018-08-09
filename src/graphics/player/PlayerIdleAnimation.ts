import { BaseAnimation } from "../animations";
import { Vector2 } from "game/util";


export class PlayerIdleAnimation extends BaseAnimation {

    public constructor() {
        super();

        const points = [
            new Vector2(0.2, 0),
            new Vector2(-0.2, 0.15),
            new Vector2(-0.1, 0),
            new Vector2(-0.2, -0.15)
        ]

        this.addKeyframe(points, 1_000_000);
    }
}
