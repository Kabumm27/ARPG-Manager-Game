import * as React from "react"
import { EntityInfo } from "./EntityInfo"
import { Entity } from "game/entities"


export interface EnemyListProps { entities: Entity[] }

export class EnemyList extends React.Component<EnemyListProps, undefined> {
    render() {
        const entities = this.props.entities.map((entity, i) => <EntityInfo key={i} entity={entity} />);

        return(
            <div>
                {entities}
            </div>
        );
    }
}