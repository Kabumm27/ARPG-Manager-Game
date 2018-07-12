import * as React from "react"
import { Equipment } from "game/equipment"
import { GearSlot } from "game/entities"


export interface EquippedGearProps { equipment: Equipment, slot: GearSlot }

export class EquippedGear extends React.Component<EquippedGearProps, undefined> {


    render() {
        const equipment = this.props.equipment;

        return(
            <div className="equipped-gear"data-tooltip={"gear_" + this.props.slot}>
                { equipment.name }
            </div>
        );
    }
}
