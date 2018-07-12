import * as React from "react"
import { Equipment, EquipmentSlot } from "game/equipment"
import { EquipmentLoot } from "game/loot"


export interface EquipmentTooltipProps { equipment: Equipment }

export class EquipmentTooltip extends React.Component<EquipmentTooltipProps, undefined> {


    render() {
        const equipment = this.props.equipment;
        const data = equipment.getTooltipData() as EquipmentLoot;

        const baseStats = data.baseStats;
        const modifierStats = data.modifierStats;

        return(
            <div className="tooltip equipment">
                <h3>{equipment.name}</h3>
                <span className="slot">{EquipmentSlot[data.slot]}</span>
                <ul className="base-stats">
                    {baseStats.map(stat => <li key={stat}>{stat}</li>)}
                </ul>
                <ul className="modifier-stats">
                    {modifierStats.map(stat => <li key={stat}>{stat}</li>)}
                </ul>
                <span className="text">{data.text}</span>
             </div> 
        );
    }
}
