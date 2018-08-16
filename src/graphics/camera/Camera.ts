import { Game } from "game";
import { IDrawable } from "../base";
import { Vector2 } from "game/util";


export interface CameraOffset {
    top: number,
    right: number,
    bottom: number,
    left: number,
    scale: number
}

export class Camera {
    private game: Game;
    
    public focusedObject: IDrawable;

    public width: number;
    public height: number;


    public constructor(game: Game, focus: IDrawable) {
        this.game = game;
        this.focusedObject = focus;

        this.width = 400; //800;
        this.height = 225; //450;
    }


    // public update() {
    //     // Center on focus object
    //     // Calculate visible screen space
    //     // set offset values
    // }

    public getCameraOffset(): CameraOffset {
        const scale = 1;
        const focusPosition = this.focusedObject.pos;

        const halfWidth = this.width / (2 * scale);
        const halfHeight = this.height / (2 * scale);

        const cameraBox = {
            top: focusPosition.y - halfHeight,
            right: focusPosition.x + halfWidth,
            bottom: focusPosition.y + halfHeight,
            left: focusPosition.x - halfWidth,
            scale: scale
        }

        return cameraBox;
    }
}
