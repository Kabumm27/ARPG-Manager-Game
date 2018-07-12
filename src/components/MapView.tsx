import * as React from "react"
import { Game } from "game"


export interface MapViewProps { game: Game }

export class MapView extends React.Component<MapViewProps, undefined> {
    render() {
        const map = this.props.game.map;
        const playerPos = this.props.game.player.pos;

        const enemies = this.props.game.enemyManager.enemies;

        const rows = [];
        for (let y = 0; y < map.height; y++) {
            const row = [];
            for (let x = 0; x < map.width; x++) {
                if (playerPos.y === y && playerPos.x === x) {
                    row.push(<td key={"td" + x + y}>P</td>);
                }
                else {
                    let renderedEnemy = false;
                    for (const enemy of enemies) {
                        if (enemy.pos.y === y && enemy.pos.x === x) {
                            row.push(<td key={"td" + x + y}>E</td>);
                            renderedEnemy = true;
                            break;
                        }
                    }

                    if (!renderedEnemy) {
                        row.push(<td key={"td" + x + y}></td>);
                    }
                }
            }
            rows.push(<tr key={"tr"+y}>{row}</tr>);
        }

        return(
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}