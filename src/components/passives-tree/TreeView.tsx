import * as React from "react"
import { ModifierType } from "game/stats"
import { PlayerCharacter } from "game/entities/player"


export interface TreeViewProps { player: PlayerCharacter }

export class TreeView extends React.Component<TreeViewProps, undefined> {
    
    render() {
        const player = this.props.player;
        const statStrings = player.cachedModifierStats.toStrings();
        const ms = player.cachedModifierStats;
        const cs = player.calculatedStats;

        const fireDmg = ms.toStringMap().get(ModifierType.FireDmg);

        return(
            <div className="window passives-tree">
                <h3>Passives Tree</h3>
                
            </div>
        );
    }
}
