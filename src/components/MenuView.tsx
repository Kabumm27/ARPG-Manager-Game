import * as React from "react"


export interface MenuViewProps {
    buttonHandler: (visibility: MenuVisibility) => void,
    menuVisibility: MenuVisibility
}

export interface MenuVisibility {
    showPassiveTree: boolean,
    showSkillCrafting: boolean,
    showPlayerStats: boolean
}

export class MenuView extends React.Component<MenuViewProps, undefined> {
    
    buttonPassiveTree() {

    }

    buttonPlayerStats() {
        // const newState = !this.props.menuVisibility.showPlayerStats;
        // this.props.buttonHandler(Object.assign(this.props.menuVisibility, {showPlayerStats: newState}));
        const state = {...this.props.menuVisibility, showPlayerStats: !this.props.menuVisibility.showPlayerStats};
        this.props.buttonHandler({...this.props.menuVisibility, showPlayerStats: !this.props.menuVisibility.showPlayerStats})
    }

    render() {
        const handler = this.props.buttonHandler;
        const mv = this.props.menuVisibility;

        return(
            <div className="window menu-view">
                <ul>
                    <li><button onClick={() => handler({...mv, showPassiveTree: !mv.showPlayerStats})}>Talents</button></li>
                    <li><button onClick={() => handler({...mv, showPlayerStats: !mv.showPlayerStats})}>Stats</button></li>
                </ul>
            </div>
        );
    }
}
