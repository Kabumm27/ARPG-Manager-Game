import * as React from "react"
import { Equipment } from "game/equipment"
import { Loot, LootCategory } from "game/loot"

import {EquipmentTooltip } from "./EquipmentTooltip"


export interface InventoryTooltipProps { loot: Loot }

export class InventoryTooltip extends React.Component<InventoryTooltipProps, undefined> {


    render() {
        const loot = this.props.loot;
        const data = loot.getTooltipData();

        let tooltip = null;
        if (data.category === LootCategory.Equipment) {
            tooltip = <EquipmentTooltip equipment={loot as Equipment} />
        }

        return(
            <div className="tooltip inventory">
                { tooltip }
            </div>
        );
    }
}
