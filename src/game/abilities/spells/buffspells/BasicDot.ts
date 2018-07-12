import { BaseAbility } from "../.."


export class BasicDot extends BaseAbility {

    public constructor(name: string) {
        super(name);

        this.baseStats.cooldown = 1000;
    }
}
