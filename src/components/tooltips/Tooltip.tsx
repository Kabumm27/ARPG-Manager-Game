import * as React from "react"
import { Game } from "game"
import { Equipment } from "game/equipment"

import { GearTooltip } from "./GearTooltip"
import { InventoryTooltip } from "./InventoryTooltip"
import { BuffTooltip } from "./BuffTooltip"


export interface TooltipProps { game: Game }
export interface TooltipState {
    elementId: string,
    visible: boolean,
    width: number,
    x: number,
    y: number
}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {

    public constructor() {
        super();

        this.state = {
            elementId: "",
            visible: false,
            width: 200,
            x: 0,
            y: 0
        }

        document.addEventListener("mousemove", e => {
            // reset tooltip if object "disappears"
            if (this.state.elementId && !document.querySelector("[data-tooltip=" + this.state.elementId + "]")) {
                this.setState({
                    visible: false
                });
            }
        });
    }

    public componentDidMount() {
        // register initial components
        this.findAllTooltipSources();
    }

    public componentDidUpdate() {
        // continuously register new components
        this.findAllTooltipSources();
    }

    private findAllTooltipSources() {
        const elements = document.querySelectorAll("[data-tooltip]:not([data-tooltip-registered])");

        for (const element of elements) {
            element.addEventListener("mouseover", (e: MouseEvent) => {
                this.setState({
                    elementId: element.getAttribute("data-tooltip"),
                    visible: true
                });
            });

            element.addEventListener("mousemove", (e: MouseEvent) => {
                let x = e.clientX;
                let y = e.clientY;
                
                if (x + this.state.width >= window.innerWidth) {
                    x = window.innerWidth - this.state.width;
                }

                this.setState({
                    x: x,
                    y: y
                });
            });

            element.addEventListener("mouseout", (e: MouseEvent) => {
                this.setState({
                    visible: false
                });
            });

            element.setAttribute("data-tooltip-registered", "true");
        }
    }

    render() {
        const player = this.props.game.player;

        const isVisible = this.state.visible;// && document.querySelector("[data-tooltip=" + this.state.elementId + "]");
        const hiddenClass = isVisible ? "" : " hidden";
        const posStyle = {
            left: this.state.x - 20,
            top: this.state.y + 10,
            width: this.state.width
        };

        let tooltip = null;
        if (this.state.visible) {
            const elementId = this.state.elementId;
            const type = elementId.substr(0, elementId.indexOf("_"));
            const id = elementId.substr(elementId.indexOf("_") + 1);

            if (type === "inventory") {
                const index = parseInt(id, 10);
                const inventory = player.inventory;
                if (inventory.items.length > index) {
                    const loot = inventory.items[index];
                    tooltip = <InventoryTooltip loot={loot} />;
                }
            }
            else if (type === "gear") {
                const index = parseInt(id, 10);
                const gear = player.gear;
                const equipment = gear.get(index);
                if (equipment) {
                    tooltip = <GearTooltip gear={equipment} />
                }
            }
            else if (type === "buff") {
                const buffs = player.buffManager.buffs;
                const buff = buffs.has(id) ? buffs.get(id) : null;

                if (buff) {
                    tooltip = <BuffTooltip activeBuff={buff} />
                }
            }
        }

        return(
            <div className={"tooltip" + hiddenClass} style={posStyle}>
                { tooltip }
            </div>
        );
    }
}
