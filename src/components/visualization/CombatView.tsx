import * as React from "react"
import { Game } from "game"
import { Camera } from "graphics/camera/Camera";


// TODO:
// - Pathfinding
// - Collision

export interface CombatViewProps { game: Game }

export class CombatView extends React.Component<CombatViewProps, undefined> {

    componentDidMount() {
        this.updateCombatView();
    }

    componentDidUpdate() {
        this.updateCombatView();
    }

    updateCombatView() {
        const canvas = document.getElementById("combat-view-canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        const game = this.props.game;
        const map = game.map;
        const camera = game.camera;
        const player = game.player;
        const enemies = game.enemyManager.enemies;

        const PI2 = Math.PI * 2;

        ctx.clearRect(0, 0, camera.width, camera.height);

        const cameraOffset = camera.getCameraOffset();
        const scale = cameraOffset.scale;
        const offsetX = cameraOffset.left;
        const offsetY = cameraOffset.top;


        // Rackdolls
        ctx.fillStyle = "Crimson";
        const activeRackdolls = this.props.game.rackdollManager.rackdolls.filter(rd => rd.active);
        for (const rackdoll of activeRackdolls) {
            for (const particle of rackdoll.particles) {
                if (particle.isVisible) {
                    ctx.fillRect((particle.pos.x - offsetX) * scale, (particle.pos.y - offsetY) * scale, 3 * scale, 3 * scale);
                }
            }
        }


        // Obstacles
        ctx.fillStyle = "DarkTurquoise";
        for (const obstacle of map.obstacles) {
            ctx.beginPath();
            ctx.arc((obstacle.pos.x - offsetX) * scale, (obstacle.pos.y - offsetY) * scale, obstacle.collisionRadius * scale, 0, PI2);
            ctx.closePath();
            ctx.fill();
        }
        

        // Player
        ctx.fillStyle = "Black";
        ctx.beginPath();
        ctx.arc((player.pos.x - offsetX) * scale, (player.pos.y - offsetY) * scale, player.collisionRadius * scale, 0, PI2);
        ctx.closePath();
        ctx.fill();

        player.graphics.draw(ctx, cameraOffset);


        // Enemies
        ctx.fillStyle = "Tomato";
        for (const enemy of enemies) {
            ctx.beginPath();
            ctx.arc((enemy.pos.x - offsetX) * scale, (enemy.pos.y - offsetY) * scale, enemy.collisionRadius * scale, 0, PI2);
            ctx.closePath();
            ctx.fill();
        }
    }

    render() {
        const camera = this.props.game.camera;

        return(
            <div className={"window combat-view"}>
                <canvas id={"combat-view-canvas"} width={camera.width} height={camera.height}></canvas>
            </div>
        );
    }
}