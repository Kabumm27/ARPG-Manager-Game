import { Vector2 } from "game/util";


export class GraphicsLayer {
    public points: Vector2[];
    public color: string;
    
    public visible: boolean;


    public constructor(points: Vector2[], color: string) {
        this.points = points;
        this.color = color;

        this.visible = true;
    }
}