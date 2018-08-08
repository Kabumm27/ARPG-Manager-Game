import * as React from "react"
import { Game } from "game";


export interface MenuViewProps {
    game: Game,
    buttonHandler: (visibility: MenuVisibility) => void,
    menuVisibility: MenuVisibility
}

export interface MenuVisibility {
    showPassiveTree: boolean,
    showSkillCrafting: boolean,
    showPlayerStats: boolean,
    showInventory: boolean,
    showGear: boolean,
    showCombatLog: boolean
}

export class MenuView extends React.Component<MenuViewProps, undefined> {

    buttonPlayerStats() {
        const state = {...this.props.menuVisibility, showPlayerStats: !this.props.menuVisibility.showPlayerStats};
        this.props.buttonHandler({...this.props.menuVisibility, showPlayerStats: !this.props.menuVisibility.showPlayerStats})
    }

    render() {
        const game = this.props.game;
        const handler = this.props.buttonHandler;
        const mv = this.props.menuVisibility;

        return(
            <div className="window menu-view">
                <ul>
                    <li><button onClick={() => game.tooglePause()}>Start/Stop</button></li>
                    <li><button onClick={() => game.test()}>Test</button></li>
                    <li><button onClick={() => handler({...mv, showPassiveTree: !mv.showPassiveTree})}>Talents</button></li>
                    <li><button onClick={() => handler({...mv, showPlayerStats: !mv.showPlayerStats})}>Stats</button></li>
                    <li><button onClick={() => handler({...mv, showInventory: !mv.showInventory})}>Inventory</button></li>
                    <li><button onClick={() => handler({...mv, showGear: !mv.showGear})}>Equipment</button></li>
                    <li><button onClick={() => handler({...mv, showCombatLog: !mv.showCombatLog})}>Combat Log</button></li>
                </ul>
            </div>
        );
    }
}
