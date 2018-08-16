import { Game } from "game";
import { AnimationState } from "../animation";
import { IDrawable, GraphicsLayer } from ".";
import { CameraOffset } from "../camera/Camera";
import { Vector2 } from "game/util";


export class Graphics {
    public game: Game;
    public object: IDrawable;

    public layers: GraphicsLayer[];

    public animation: AnimationState;

    public constructor(game: Game, object: IDrawable) {
        this.game = game;
        this.object = object;

        this.layers = new Array<GraphicsLayer>();

        this.animation = new AnimationState(game, object);
    }


    public update() {
        this.animation.update();
    }

    public draw(ctx: CanvasRenderingContext2D, cameraOffset: CameraOffset) {
        const pos = this.object.pos;
        const dir = this.object.dir;
        const angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI;
        
        const animationTransform = this.animation.getTransform();

        for (const layer of this.layers) {
            if (!layer.visible) continue;

            ctx.fillStyle = layer.color;
            const transformedPoints = layer.points.map(v => 
                v.clone()
                // CHECK: animation rotation here?
                .add(animationTransform.position)
                .rotate(angle + animationTransform.rotation)
                .nonUniformScale(animationTransform.scale)
                .add(pos)
                .minus(new Vector2(cameraOffset.left, cameraOffset.top))
                .times(cameraOffset.scale)
            );

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