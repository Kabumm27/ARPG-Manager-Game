import * as React from "react"
import { ActiveBuff } from "game/buffs"
import { ModifierStats } from "game/stats"
import { TalentNode } from "game/talent-graph";


export interface TalentTooltipProps { talent: TalentNode }

export class TalentTooltip extends React.Component<TalentTooltipProps, undefined> {


    render() {
        const talent = this.props.talent;
        const name = talent.name;
        // const stats = talent.stats;

        const stats = talent.stats.toStrings();

        return(
            <div className="tooltip talent-node">
                <ul className="modifier-stats">
                    {stats.map(stat => <li key={stat}>{stat}</li>)}
                </ul>
             </div>
        );
    }
}
