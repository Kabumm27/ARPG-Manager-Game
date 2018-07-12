import * as React from "react"
import { ProgressBar } from "./ProgressBar"
import { Entity } from "game/entities"


export interface EntityInfoProps { entity: Entity }

export class EntityInfo extends React.Component<EntityInfoProps, undefined> {
    render() {
        const entity = this.props.entity;
        const health = entity.calculatedStats.health;
        const currentHealth = entity.calculatedStats.currentHealth;

        let buffs = new Array<any>();
        for (const activeBuff of entity.buffManager.buffs.values()) {
            const buff = activeBuff.buff;
            buffs.push(
                <div key={buff.id} className="buff" data-tooltip={"enemy-buff_" + buff.id}>
                    {activeBuff.stacks + "x " + buff.name + " - " + Math.ceil(activeBuff.duration / 1000) + " sec"}
                </div>
            )
        }

        return(
            <div className="entity-info">
                <h3>{entity.name}</h3>
                <ProgressBar className="health-bar" color="greenyellow" progress={currentHealth / health} />
                {buffs}
            </div>
        );
    }
}