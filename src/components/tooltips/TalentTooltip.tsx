import * as React from "react"
import { ActiveBuff } from "game/buffs"
import { ModifierStats } from "game/stats"
import { TalentNode } from "game/talent-graph";


export interface TalentTooltipProps { talent: TalentNode }

export class TalentTooltip extends React.Component<TalentTooltipProps, undefined> {


    render() {

        return(
            <div className="tooltip talent-node">
                <ul className="modifier-stats">
                    {this.props.talent.name}
                </ul>
             </div>
        );
    }
}
