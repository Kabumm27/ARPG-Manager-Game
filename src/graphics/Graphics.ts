import { Game } from "game";
import { AnimationState, BaseAnimation } from "./animation";
import { IDrawable } from "./IDrawable";
import { Vector2 } from "game/util";
import { PlayerAttackAnimation } from "./player";


export class Graphics {
    public game: Game;
    public object: IDrawable;

    public layers: Vector2[][];

    public animation: AnimationState;

    public constructor(game: Game, object: IDrawable) {
        this.game = game;
        this.object = object;

        this.layers = new Array<Vector2[]>();
        // this.layers.push(new Array<Vector2>());

        // Debug code - Player arrow
        const playerCharaterVector = [
            new Vector2(0.2, 0),
            new Vector2(-0.2, 0.15),
            new Vector2(-0.1, 0),
            new Vector2(-0.2, -0.15)
        ]

        this.layers.push(playerCharaterVector);

        this.animation = new AnimationState(game, this, object);
    }


    public update() {
        this.animation.update();
    }

    public draw(ctx: CanvasRenderingContext2D, canvasScale: number) {
        const pos = this.object.pos;
        const dir = this.object.dir;
        const angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI;

        
        ctx.fillStyle = "black";

        for (const layer of this.layers) {
            const animationTransform = this.animation.getTransform();

            const transformedPoints = layer.map(v => 
                v.clone()
                // CHECK: animation rotation here?
                .add(animationTransform.pos)
                .rotate(angle + animationTransform.rot)
                .times(animationTransform.scale)
                .add(pos)
                .times(canvasScale));

            ctx.beginPath();
            ctx.moveTo(transformedPoints[0].x, transformedPoints[0].y);
            for (let i = 1; i < transformedPoints.length; i++) {
                ctx.lineTo(transformedPoints[i].x, transformedPoints[i].y);
            }
            ctx.closePath();
            ctx.fill();
        }
    }
}