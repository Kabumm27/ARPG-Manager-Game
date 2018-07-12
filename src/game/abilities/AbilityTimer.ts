export class AbilityTimer {
    public value: number;
    public overlap: number;


    public constructor() {
        this.value = 0;
        this.overlap = 0;
    }

    public add(dt: number, max: number) {
        this.value += this.overlap; // from last tick
        this.value += dt;
        this.value = Math.min(this.value, max);
        this.overlap = Math.max(0, this.value - max);
    }
}
