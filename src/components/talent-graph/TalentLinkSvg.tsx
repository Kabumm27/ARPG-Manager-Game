import * as React from "react"
import { ModifierType } from "game/stats"
import { PlayerCharacter } from "game/entities/player"
import { TalentNode } from "game/talent-graph";


export interface TalentLinkSvgProps {
    xOffset: number,
    yOffset: number,
    source: TalentNode,
    target: TalentNode
}

export class TalentLinkSvg extends React.Component<TalentLinkSvgProps, undefined> {   

    render() {
        const source = this.props.source;
        const target = this.props.target;
        const xOffset = this.props.xOffset;
        const yOffset = this.props.yOffset;

        const stroke = source.active && target.active ? "black" : "grey";
        const width = source.active && target.active ? 3 : 2;

        return(
            <line stroke={stroke} strokeWidth={width} x1={source.x + xOffset} y1={source.y + yOffset} x2={target.x + xOffset} y2={target.y + yOffset} />
        );
    }
}
