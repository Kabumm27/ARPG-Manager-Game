import * as React from "react"
import { ModifierType } from "game/stats"
import { PlayerCharacter } from "game/entities/player"


export interface SkillCraftingViewProps { player: PlayerCharacter }

export class SkillCraftingView extends React.Component<SkillCraftingViewProps, undefined> {
    
    render() {
        const player = this.props.player;
        const statStrings = player.cachedModifierStats.toStrings();
        const ms = player.cachedModifierStats;
        const cs = player.calculatedStats;

        const fireDmg = ms.toStringMap().get(ModifierType.FireDmg);

        return(
            <div className="window skill-crafting">
                <h3>Skill Crafting</h3>
                
            </div>
        );
    }
}
