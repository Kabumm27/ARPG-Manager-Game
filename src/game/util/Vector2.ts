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

    public length() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    public normalize() {
        const length = Math.sqrt(this.x**2 + this.y**2);
        this.x = this.x / length;
        this.y = this.y / length;

        return this;
    }

    public set(x: number, y: number) {
        this.x = x;
        this.y = y;

        return this;
    }

    public clone() {
        return new Vector2(this.x, this.y);
    }

    public rotate(deg: number, clockwise: boolean = false) {
        const rad = deg / 180 * Math.PI;
        
        const rotatedX = this.x * Math.cos(rad) - this.y * Math.sin(rad);
        const rotatedY = this.x * Math.sin(rad) + this.y * Math.cos(rad);

        this.x = Math.round(rotatedX * 1000) / 1000;
        this.y = Math.round(rotatedY * 1000) / 1000;
        
        return this;
    }

    public add(other: Vector2) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    public minus(other: Vector2) {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    public times(multi: number) {
        this.x *= multi;
        this.y *= multi;

        return this;
    }
}