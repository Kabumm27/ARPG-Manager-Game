export class Vector2 {
    public x: number;
    public y: number;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public distance(other: Vector2) {
        const deltaX = this.x - other.x;
        const deltaY = this.y - other.y;
        
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    public set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public copy() {
        return new Vector2(this.x, this.y);
    }
}