import * as React from "react"
import { InventoryItem } from "./InventoryItem"
import { Inventory } from "game/entities"
import { Loot } from "game/loot"
import { Gear } from "game/entities"


export interface InventoryViewProps { gear: Gear, inventory: Inventory }

export class InventoryView extends React.Component<InventoryViewProps, undefined> {
    render() {
        const inventory = this.props.inventory;
        const gear = this.props.gear;
        const items = inventory.items.map((item, i) => <InventoryItem key={i} gear={gear} item={item} index={i} />);

        return(
            <div className="window inventory-view">
                { items.length > 0 ? items : <h3>Empty inventory</h3> }
            </div>
        );
    }
}
