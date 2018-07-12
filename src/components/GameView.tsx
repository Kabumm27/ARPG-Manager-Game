import * as React from "react"
import { Game } from "../game/Game"

import { MapView } from "./MapView"
import { EntityInfo } from "./EntityInfo"
import { PlayerInfo } from "./PlayerInfo"
import { EnemyList } from "./EnemyList"
import { CombatLog } from "./CombatLog"
import { InventoryView } from "./inventory/InventoryView"
import { GearView } from "./gear/GearView"
import { PlayerStatsView } from "./char-info/PlayerStatsView"
import { TreeView } from "./passives-tree/TreeView"
import { SkillCraftingView } from "./skill-crafting/SkillCraftingView"
import { Tooltip } from "./tooltips/Tooltip"

export interface GameViewProps { game: Game }

export class GameView extends React.Component<GameViewProps, undefined> {
    componentDidMount() {
        this.props.game.externalRedraw = () => this.forceUpdate();
    }

    render() {
        const game = this.props.game;

        return(
            <div>
                <MapView game={game} />
                <button onClick={() => game.tooglePause()}>Start/Stop</button>
                <button onClick={() => game.test()}>Test</button>
                <PlayerInfo player={game.player} />
                <EnemyList entities={game.enemyManager.enemies} />
                <CombatLog log={game.combatManager.combatLog} />
                <InventoryView gear={game.player.gear} inventory={game.player.inventory} />
                <GearView gear={game.player.gear} />
                <PlayerStatsView player={game.player} />
                <SkillCraftingView player={game.player} />
                <TreeView player={game.player} />
                <Tooltip game={game} />
            </div>
        );
    }
}
