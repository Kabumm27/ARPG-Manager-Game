import * as React from "react"


export interface CombatLogProps { log: string[] }

export class CombatLog extends React.Component<CombatLogProps, undefined> {
    private combatLog: HTMLElement;

    componentDidUpdate() {
        this.combatLog.scrollTop = this.combatLog.scrollHeight;
    }

    render() {
        const entries = this.props.log.map((entry, i) => <div key={i}>{entry}</div>);

        return(
            <div className="combat-log" ref={(el) => this.combatLog = el}>
                {entries}
            </div>
        );
    }
}