import * as React from "react"
import { ProgressBar } from "./ProgressBar"
import { PlayerCharacter } from "game/entities/player"


export interface PlayerInfoProps { player: PlayerCharacter }

export class PlayerInfo extends React.Component<PlayerInfoProps, undefined> {
    render() {
        const player = this.props.player;
        const playerStats = player.calculatedStats;
        const playerExp = player.level;
        
        const healthProgress = playerStats.currentHealth / playerStats.health;
        const manaProgress = playerStats.currentMana / playerStats.mana;
        const expIndex = Math.min(playerExp.levelBorders.length, playerExp.current) - 1;
        const expProgress = playerExp.currentExperience / playerExp.levelBorders[expIndex];

        let buffs = new Array<any>();
        for (const activeBuff of player.buffManager.buffs.values()) {
            const buff = activeBuff.buff;
            buffs.push(
                <div key={buff.id} className="buff" data-tooltip={"buff_" + buff.id}>
                    {activeBuff.stacks + "x " + buff.name + " - " + Math.ceil(activeBuff.duration / 1000) + " sec"}
                </div>
            )
        }

        return(
            <div className="window player-info">
                <h3>{player.name} - Lvl {player.level.current}</h3>
                <ProgressBar className="health-bar" color="greenyellow" progress={healthProgress} />
                <ProgressBar className="mana-bar" color="blue" progress={manaProgress} />
                <ProgressBar className="exp-bar" color="yellow" progress={expProgress} />
                {buffs}
            </div>
        );
    }
}