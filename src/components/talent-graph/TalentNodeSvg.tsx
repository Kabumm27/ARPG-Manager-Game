import * as React from "react"
import { ModifierType } from "game/stats"
import { PlayerCharacter } from "game/entities/player"
import { TalentNode } from "game/talent-graph";


export interface TalentNodeSvgProps {
    xOffset: number,
    yOffset: number,
    node: TalentNode,
    onClick: (e: React.MouseEvent, node: TalentNode) => void
}

export class TalentNodeSvg extends React.Component<TalentNodeSvgProps, undefined> {   

    render() {
        const node = this.props.node;

        const colors = {
            small: "grey",
            smallActive: "black",
            medium: "lightblue",
            mediumActive: "blue",
            big: "tomato",
            bigActive: "red",
        }

        let radius = 6;
        let fill = "black";
        if (node.size === "small") {
            radius = 6;
            fill = node.active ? colors.smallActive : colors.small;
        }
        else if (node.size === "medium") {
            radius = 10;
            fill = node.active ? colors.mediumActive : colors.medium;
        }
        else if (node.size === "big") {
            radius = 16;
            fill = node.active ? colors.bigActive : colors.big;
        }

        return(
            <circle data-tooltip={"talent_" + node.id} onClick={e=>this.props.onClick(e, node)} 
                onContextMenu={e=>this.props.onClick(e, node)} fill={fill} 
                cx={node.x + this.props.xOffset} cy={node.y + this.props.yOffset} r={radius} />
        );
    }
}
