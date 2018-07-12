import * as React from "react"
import { Gear, GearSlot } from "game/entities"
import { Equipment } from "game/equipment"

import { EquippedGear } from "./EquippedGear"


export interface GearViewProps { gear: Gear }

export class GearView extends React.Component<GearViewProps, undefined> {


    private unequip(e: React.MouseEvent<HTMLSpanElement>, slot: GearSlot) {
        this.props.gear.unequip(slot);

        e.preventDefault();
    }

    render() {
        const gear = this.props.gear;
        const equipment = new Array<{ equipment: Equipment, slot: GearSlot }>();
        equipment.push({equipment: gear.helmet, slot: GearSlot.Helmet});
        equipment.push({equipment: gear.bodyarmor, slot: GearSlot.Bodyarmor});

        return(
            <div className="window gear-view">
                <div className="gear-slot head" onContextMenu={e => this.unequip(e, GearSlot.Helmet)}>
                    { gear.helmet ? (
                        <EquippedGear equipment={gear.helmet} slot={GearSlot.Helmet} />
                    ) : "Head" }
                </div>
                <div className="gear-slot shoulder">
                    Shoulder
                </div>
                <div className="gear-slot breast" onContextMenu={e => this.unequip(e, GearSlot.Bodyarmor)}>
                    { gear.bodyarmor ? (
                        <EquippedGear equipment={gear.bodyarmor} slot={GearSlot.Bodyarmor} />
                    ) : "Breast" }
                </div>
                <div className="gear-slot hands" onContextMenu={e => this.unequip(e, GearSlot.Gauntlet)}>
                    { gear.gauntlet ? (
                        <EquippedGear equipment={gear.gauntlet} slot={GearSlot.Gauntlet} />
                    ) : "Hands" }
                </div>
                <div className="gear-slot legs">
                    Legs
                </div>
                <div className="gear-slot feet" onContextMenu={e => this.unequip(e, GearSlot.Boots)}>
                    { gear.boots ? (
                        <EquippedGear equipment={gear.boots} slot={GearSlot.Boots} />
                    ) : "Feet" }
                </div>

                <div className="gear-slot small ring-1">
                    Ring 1
                </div>
                <div className="gear-slot small ring-2">
                    Ring 2
                </div>
                <div className="gear-slot small neck">
                    Neck
                </div>

                <div className="gear-slot large weapon-mainhand" onContextMenu={e => this.unequip(e, GearSlot.Weapon)}>
                    { gear.weapon ? (
                        <EquippedGear equipment={gear.weapon} slot={GearSlot.Weapon} />
                    ) : "Mainhand" }
                </div>
                <div className="gear-slot large weapon-offhand">
                    Offhand
                </div>
            </div>
        );
    }
}
