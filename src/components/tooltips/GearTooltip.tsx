import * as React from "react"
import { Equipment } from "game/equipment"

import { EquipmentTooltip } from "./EquipmentTooltip"

export interface GearTooltipProps { gear: Equipment }

export class GearTooltip extends React.Component<GearTooltipProps, undefined> {


    render() {
        const equipment = this.props.gear;

        return(
            <div className="tooltip gear">
                <EquipmentTooltip equipment={equipment} />
            </div>
        );
    }
}
