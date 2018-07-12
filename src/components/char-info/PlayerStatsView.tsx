import * as React from "react"
import { ModifierType } from "game/stats"
import { PlayerCharacter } from "game/entities/player"


export interface PlayerStatsViewProps { player: PlayerCharacter }

export class PlayerStatsView extends React.Component<PlayerStatsViewProps, undefined> {
    
    private round(x: number) {
        return Math.round(x * 100) / 100;
    }

    render() {
        const player = this.props.player;
        const statStrings = player.cachedModifierStats.toStrings();
        const ms = player.cachedModifierStats;
        const cs = player.calculatedStats;

        const fireDmg = ms.toStringMap().get(ModifierType.FireDmg);

        return(
            <div className="window player-stats">
                <h3>{player.name}'s stats</h3>
                <ul>
                    <li>{this.round(cs.health)} max health</li>
                    <li>{this.round(cs.healthReg)} health reg/sec</li>
                    <li>{this.round(cs.mana)} max mana</li>
                    <li>{this.round(cs.manaReg)} mana reg/sec</li>
                    <li>{this.round(cs.armor)} armor</li>
                    <li>{this.round(cs.physResistance)} phys res</li>
                    <li>{this.round(cs.movementSpeed * 100)}% movement speed</li>

                    <li>{cs.int} int</li>
                    <li>{cs.dex} dex</li>
                    <li>{cs.str} str</li>

                    <li>{fireDmg.flatAdditive}</li>
                    <li>{fireDmg.percentMulti}</li>
                    <li>{fireDmg.percentAdditive}</li>
                </ul>
            </div>
        );
    }
}
