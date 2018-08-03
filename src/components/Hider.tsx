import * as React from "react"


export interface HiderProps {
    visible: boolean
}
export interface HiderState {}

export class Hider extends React.Component<HiderProps, HiderState> {
    
    render() {

        return(
            <div>{this.props.visible && this.props.children}</div>
        );
    }
}
