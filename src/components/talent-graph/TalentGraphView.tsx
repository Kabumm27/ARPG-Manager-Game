import * as React from "react"
import { ModifierType } from "game/stats"
import { PlayerCharacter } from "game/entities/player"

import { TalentNodeSvg } from "./TalentNodeSvg"
import { TalentLinkSvg } from "./TalentLinkSvg";
import { TalentNode } from "game/talent-graph";


export interface TalentGraphViewProps {
    player: PlayerCharacter,
    exit: () => void
}
export interface TalentGraphViewState {
    xOffset: number,
    yOffset: number,
    zoom: number
}

export class TalentGraphView extends React.Component<TalentGraphViewProps, TalentGraphViewState> {

    constructor(props: TalentGraphViewProps) {
        super(props);

        this.state = {
            xOffset: 0,
            yOffset: 0,
            zoom: 0
        }
    }

    componentDidMount() {
        const div = document.querySelector(".window.talent-graph");

        this.onResize();
        window.addEventListener("resize", () => this.onResize());

        // Movement
        let isMouseDown = false;
        let startX = 0;
        let startY = 0;

        div.addEventListener("mousedown", (e: MouseEvent) => {
            isMouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
        });

        div.addEventListener("mousemove", (e: MouseEvent) => {
            if (isMouseDown) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                startX += deltaX;
                startY += deltaY;

                this.setState({
                    xOffset: this.state.xOffset + deltaX,
                    yOffset: this.state.yOffset + deltaY
                });
            }
        });

        div.addEventListener("mouseup", (e: MouseEvent) => {
            isMouseDown = false;
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.onResize());
    }

    onResize() {
        const div = document.querySelector(".window.talent-graph");
        // console.log(div.clientHeight, div.clientWidth);

        if (this.state.zoom === 0) {
            this.setState({
                xOffset: div.clientWidth / 2,
                yOffset: div.clientHeight / 2
            })
        }
    }

    nodeClickHandler(e: React.MouseEvent, node: TalentNode) {
        const talentGraph = this.props.player.talentGraph;

        let success = false;
        if (e.button === 0) {
            success = talentGraph.activateNode(node.id);
        }
        else if (e.button === 2) {
            success = talentGraph.deactivateNode(node.id);
        }

        if (success) this.forceUpdate();

        e.preventDefault();
    }

    render() {
        const player = this.props.player;

        const xOffset = this.state.xOffset;
        const yOffset = this.state.yOffset;

        const linkRenderList = new Array();
        for (const {source, target} of player.talentGraph.links) {
            const key = "k_" + source.id + "_" + target.id;
            linkRenderList.push(<TalentLinkSvg key={key} source={source} target={target} xOffset={xOffset} yOffset={yOffset} />);
        }

        const nodeRenderList = new Array();
        for (const node of player.talentGraph.talents) {
            nodeRenderList.push(<TalentNodeSvg key={"k_" + node.id} onClick={(e, node)=>this.nodeClickHandler(e, node)} node={node} xOffset={xOffset} yOffset={yOffset} />);
        }

        return(
            <div className="window talent-graph">
                <svg 
                    className="svg"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink">

                    <defs>
                        <g id="Port">
                            <circle style={{fill:'inherit'}} r="10"/>
                        </g>
                    </defs>

                    {linkRenderList}
                    {nodeRenderList}

                    {/* <text y="15">black</text>
                    <use x="70" y="10" xlinkHref="#Port" />
                    <text y="35">test</text>
                    <use x="70" y="30" xlinkHref="#Port" className="classA"/>
                    <text y="55">blue</text>
                    <use x="0" y="50" xlinkHref="#Port" style={{fill:'blue'}}/> */}
                </svg>
                
                <div className="overlay">
                    <h3>Talent Graph</h3>
                    <button onClick={() => this.props.exit()}>X</button>
                </div>
            </div>
        );
    }
}
