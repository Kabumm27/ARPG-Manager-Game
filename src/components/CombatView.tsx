import * as React from "react"
import { Game } from "game"


export interface CombatViewProps { game: Game }

export class CombatView extends React.Component<CombatViewProps, undefined> {
    private readonly multi = 40;

    componentDidMount() {
        this.updateCombatView();
    }

    componentDidUpdate() {
        this.updateCombatView();
    }

    updateCombatView() {
        const canvas = document.getElementById("combat-view-canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        const map = this.props.game.map;
        const player = this.props.game.player;
        const enemies = this.props.game.enemyManager.enemies;

        ctx.clearRect(0, 0, map.width * this.multi, map.height * this.multi);

        // Player
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(player.pos.x * this.multi, player.pos.y * this.multi, 5, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();

        // Enemies
        ctx.fillStyle = "tomato";
        for (const enemy of enemies) {
            ctx.beginPath();
            ctx.arc(enemy.pos.x * this.multi, enemy.pos.y * this.multi, 5, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }

    render() {
        const map = this.props.game.map;
        const playerPos = this.props.game.player.pos;

        const enemies = this.props.game.enemyManager.enemies;

        return(
            <div className={"window combat-view"}>
                <canvas id={"combat-view-canvas"} width={map.width * this.multi} height={map.height * this.multi}></canvas>
            </div>
        );
    }
}