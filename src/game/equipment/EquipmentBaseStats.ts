export class EquipmentBaseStats {
    public armor: number;

    public constructor() {
        this.armor = 0;
    }

    public static merge(baseStats: EquipmentBaseStats[]) {
        const stats = new EquipmentBaseStats();
        
        for (const equipmentBaseStats of baseStats) {
            stats.armor += equipmentBaseStats.armor;
        }

        return stats;
    }
}