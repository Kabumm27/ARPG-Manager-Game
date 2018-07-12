import * as React from "react"
import { ActiveBuff } from "game/buffs"
import { ModifierStats } from "game/stats"


export interface BuffTooltipProps { activeBuff: ActiveBuff }

export class BuffTooltip extends React.Component<BuffTooltipProps, undefined> {


    render() {
        const activeBuff = this.props.activeBuff;
        const buff = activeBuff.buff;

        const stats = new Array<ModifierStats>();
        for (let i = 0; i < activeBuff.stacks; i++) {
            stats.push(buff.modifierStats);
        }
        const buffStrings = ModifierStats.merge(stats).toStrings();

        return(
            <div className="tooltip buff">
                <h3>{buff.name}</h3>
                <ul className="modifier-stats">
                {
                    buffStrings.map(str =>
                        <li key={str}>{str}</li>
                    )
                }
                </ul>
             </div> 
        );
    }
}
