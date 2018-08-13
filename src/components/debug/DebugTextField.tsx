import * as React from "react"
import { Game } from "game";


export interface DebugTextFieldProps { game: Game }

export class DebugTextField extends React.Component<DebugTextFieldProps, undefined> {

    render() {
        const currentAnimation = this.props.game.player.graphics.animation.currentAnimation;
        const text = currentAnimation && currentAnimation.name;

        return(
            <div className="window debug">
                {text}
            </div>
        );
    }
}