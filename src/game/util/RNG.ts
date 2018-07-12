export class RNG {
    private rngFunction: () => number;
    public counter: number;

    public constructor(rngFunction: () => number) {
        this.rngFunction = rngFunction;

        this.counter = 0;
    }

    public random() {
        return this.rngFunction();
    }

    public randomRangeInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    public randomRangeDouble(min: number, max: number) {
        return this.random() * (max - min) + min;
    }
}