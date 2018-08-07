import * as React from "react"
import { Game } from "game"


// TODO:
// - Ragdoll
// - Pathfinding
// - Animations
// - Collision

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

        // Rackdolls
        ctx.fillStyle = "tomato";
        const activeRackdolls = this.props.game.rackdollManager.rackdolls.filter(rd => rd.active);
        for (const rackdoll of activeRackdolls) {
            // ctx.beginPath();
            // ctx.arc(rackdoll.pos.x * this.multi, rackdoll.pos.y * this.multi, 5, 0, 2*Math.PI);
            // ctx.closePath();
            // ctx.fill();

            for (const particle of rackdoll.particles) {
                if (particle.isVisible) {
                    ctx.fillRect(particle.pos.x * this.multi, particle.pos.y * this.multi, 3, 3);
                }
            }
        }
        

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

        return(
            <div className={"window combat-view"}>
                <canvas id={"combat-view-canvas"} width={map.width * this.multi} height={map.height * this.multi}></canvas>
            </div>
        );
    }
}