import { Modifier } from "."


export class ModifierStats {

    public modifiers: Modifier[] = [];

    public constructor() {
        const length = Object.keys(ModifierType).length / 2;
        for (let i = 0; i < length; i++) {
            this.modifiers.push(new Modifier(i, ModifierType[i]));
        }
    }

    public getModifier(type: ModifierType) {
        return this.modifiers[type];
    }

    public setModifier(type: ModifierType, flatAdditive: number, percentMulti: number, percentAdditive: number) {
        this.modifiers[type].flatAdditive = flatAdditive;
        this.modifiers[type].percentMulti = percentMulti + 1; // TODO: Move to apply?
        this.modifiers[type].percentAdditive = percentAdditive;
    }

    public apply(value: number, type: ModifierType) {
        const attr = this.getModifier(type);
        value += attr.flatAdditive;
        value *= attr.percentMulti;
        value *= attr.percentAdditive + 1;

        return value;
    }

    public static merge(modifierStatsList: ModifierStats[]) {
        const stats = new ModifierStats();

        for (const modifierStats of modifierStatsList) {
            for (let i = 0; i < modifierStats.modifiers.length; i++) {
                const modifier = modifierStats.modifiers[i];
                stats.modifiers[i].flatAdditive += modifier.flatAdditive;
                stats.modifiers[i].percentAdditive += modifier.percentAdditive;
                stats.modifiers[i].percentMulti *= modifier.percentMulti;
            }
        }

        return stats;
    }

    public toStringMap() {
        const map = new Map<ModifierType, { flatAdditive: string, percentAdditive: string, percentMulti: string}>();

        for (const modifier of this.modifiers) {
            const faSign = modifier.flatAdditive >= 0 ? "+" : "-";
            const faValue = Math.abs(Math.round(modifier.flatAdditive));

            // const paSign = modifier.percentAdditive >= 0 ? "+" : "-";
            const paSignText = modifier.percentAdditive >= 0 ? "increased" : "decreased";
            const paValue = Math.abs(Math.round(modifier.percentAdditive * 100));

            // const pmSign = modifier.percentMulti >= 1 ? "+" : "-";
            const pmSignText = modifier.percentMulti >= 1 ? "more" : "less";
            const pmValue = Math.abs(Math.round((modifier.percentMulti - 1) * 100));

            map.set(modifier.key, {
                flatAdditive: faSign + " " + faValue + " " + modifier.name,
                percentAdditive: paValue + "% " + paSignText + " " + modifier.name,
                percentMulti: pmValue + "% " + pmSignText + " " + modifier.name
            });
        }

        return map;
    }

    public toStrings(type: ModifierType = null) {
        const strings = new Array<string>();

        for (const modifier of this.modifiers) {
            if (modifier.flatAdditive !== 0) {
                const sign = modifier.flatAdditive >= 0 ? "+" : "-";
                const value = Math.abs(Math.round(modifier.flatAdditive));

                strings.push(sign + " " + value + " " + modifier.name);
            }
            if (modifier.percentAdditive !== 0) {
                const sign = modifier.percentAdditive >= 0 ? "+" : "-";
                const signText = modifier.percentAdditive >= 0 ? "increased" : "decreased";
                const value = Math.abs(Math.round(modifier.percentAdditive * 100));

                strings.push(value + "% " + signText + " " + modifier.name);
            }
            if (modifier.percentMulti !== 1) {
                const sign = modifier.percentMulti >= 1 ? "+" : "-";
                const signText = modifier.percentMulti >= 1 ? "more" : "less";
                const value = Math.abs(Math.round((modifier.percentMulti - 1) * 100));

                strings.push(value + "% " + signText + " " + modifier.name);
            }
        }

        return strings;
    }
}

export enum ModifierType {
    Health,
    Mana,
    HealthReg,
    ManaReg,
    ResourceCost,
    Armor,
    PhysDmg,
    FireDmg,
    AttackSpeed,
    MovementSpeed,
    Cooldown,
    Range,
    Int,
    Dex,
    Str
}

export enum ModifierStat {
    Flat,
    Multi,
    Percent
}
