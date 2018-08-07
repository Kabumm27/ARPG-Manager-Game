import * as React from "react"
import { Game } from "../game/Game"

import { Hider } from "./Hider"
import { MapView } from "./MapView"
import { EntityInfo } from "./EntityInfo"
import { PlayerInfo } from "./PlayerInfo"
import { EnemyList } from "./EnemyList"
import { CombatLog } from "./CombatLog"
import { InventoryView } from "./inventory/InventoryView"
import { GearView } from "./gear/GearView"
import { PlayerStatsView } from "./char-info/PlayerStatsView"
import { TalentGraphView } from "./talent-graph/TalentGraphView"
import { SkillCraftingView } from "./skill-crafting/SkillCraftingView"
import { Tooltip } from "./tooltips/Tooltip"
import { MenuView, MenuVisibility } from "./MenuView"
import { CombatView } from "./visualization/CombatView";

export interface GameViewProps { game: Game }
export interface GameViewStats {
    menuVisibility: MenuVisibility
}

export class GameView extends React.Component<GameViewProps, GameViewStats> {
    
    public constructor(props: GameViewProps) {
        super(props);

        this.state = {
            menuVisibility: {
                showPassiveTree: false,
                showSkillCrafting: false,
                showPlayerStats: false
            }
        }
    }

    componentDidMount() {
        this.props.game.externalRedraw = () => this.forceUpdate();
    }

    menuHandler(visibility: MenuVisibility) {
        this.setState({
            menuVisibility: visibility
        });
    }

    closePassiveTreeHandler() {
        this.menuHandler({...this.state.menuVisibility, showPassiveTree: false})
    }
    
    render() {
        const game = this.props.game;
        const menuVisibility = this.state.menuVisibility;

        return(
            <div>
                {/* <MapView game={game} /> */}
                <CombatView game={game} />
                <PlayerInfo player={game.player} />
                <EnemyList entities={game.enemyManager.enemies} />
                <CombatLog log={game.combatManager.combatLog} />
                <InventoryView gear={game.player.gear} inventory={game.player.inventory} />
                <GearView gear={game.player.gear} />
                <MenuView game={game} menuVisibility={this.state.menuVisibility} buttonHandler={v => this.menuHandler(v)} />
                <Hider visible={menuVisibility.showPlayerStats}><PlayerStatsView player={game.player} /></Hider>
                <Hider visible={menuVisibility.showSkillCrafting}><SkillCraftingView player={game.player} /></Hider>
                <Hider visible={menuVisibility.showPassiveTree}><TalentGraphView player={game.player} exit={() => this.closePassiveTreeHandler()} /></Hider>
                <Tooltip game={game} />
            </div>
        );
    }
}
