export class Modifier {
    public key: number;
    public name: string;

    public flatAdditive: number;
    // public flatMulti: number;
    public percentAdditive: number;
    public percentMulti: number;

    public constructor(key: number, name: string) {
        this.key = key;
        this.name = name;

        this.flatAdditive = 0;
        // this.flatMulti = 1;
        this.percentAdditive = 0;
        this.percentMulti = 1;

        // Formula:
        // const a = (base + flatAdditive) * percentMulti;
        // return a + a * percentAdditive;
    }

    public setModifier(flatAdditive: number, percentMulti: number, percentAdditive: number) {
        this.flatAdditive = flatAdditive;
        this.percentMulti = percentMulti + 1;
        this.percentAdditive = percentAdditive;
    }
}