import * as React from "react"
import * as ReactDOM from "react-dom"
import { Game } from "game/Game"

import { GameView } from "./components/GameView"


const game = new Game();
(window as any).game = game;
console.log(game);

ReactDOM.render(
    <GameView game={game} />,
    document.getElementById("react")
);