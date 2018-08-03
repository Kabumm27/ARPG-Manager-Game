import * as React from "react"
import { Loot, LootCategory, Rarity } from "game/loot"
import { Gear } from "game/entities"
import { Equipment, EquipmentSlot } from "game/equipment"


export interface InventoryItemProps { gear: Gear, item: Loot, index: number }
export interface InventoryItemState { expanded: boolean }

export class InventoryItem extends React.Component<InventoryItemProps, InventoryItemState> {

    constructor(props: InventoryItemProps) {
        super(props);

        this.state = {
            expanded: true
        };
    }

    private toggleExpand(e: React.MouseEvent<HTMLSpanElement>) {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    private isEquipable(item: Loot): item is Equipment {
        return item instanceof Equipment;
    }

    private equip(e: React.MouseEvent<HTMLDivElement>, item: Loot) {
        if (this.isEquipable(item)) {
            this.props.gear.fastEquip(item);
        }

        e.preventDefault();
    }

    render() {
        const item = this.props.item;
        const itemIndex = this.props.index;
        const tooltipData = item.getTooltipData();
        let tooltip = null;
        const type = LootCategory[tooltipData.category];

        let cssClass = "inventory-item";

        if (tooltipData.category === LootCategory.Equipment) {
            const baseStats = tooltipData.baseStats;
            const modifierStats = tooltipData.modifierStats;
            cssClass += " " + Rarity[tooltipData.rarity].toLocaleLowerCase();

            tooltip = (
                <div>
                    <span className="slot">{EquipmentSlot[tooltipData.slot]}</span>
                    <ul className="base-stats">
                        {baseStats.map(stat => <li key={stat}>{stat}</li>)}
                    </ul>
                    <ul className="modifier-stats">
                        {modifierStats.map(stat => <li key={stat}>{stat}</li>)}
                    </ul>
                    <span className="text">{tooltipData.text}</span>
                </div>
            );
        }

        return(
            <div className={cssClass} onContextMenu={e => this.equip(e, item)} data-tooltip={"inventory_" + this.props.index}>
                <h3>{item.name} <span className="category">{LootCategory[tooltipData.category]}</span></h3>
            </div>
        );
    }
}