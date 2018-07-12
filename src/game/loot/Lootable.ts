import { Loot } from "."

export interface Lootable {
    getLoot(): Loot[];
}

export function isLootable(obj: any): obj is Lootable {
    return obj.getLoot !== undefined;
}
