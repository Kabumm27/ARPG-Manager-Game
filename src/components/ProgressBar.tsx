import * as React from "react"


export interface ProgressBarProps { className: string, color: string, progress: number }

export class ProgressBar extends React.Component<ProgressBarProps, undefined> {
    render() {
        let progress = this.props.progress;
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        const width = {
            "width": (progress * 100) + "%",
            "backgroundColor": this.props.color
        }

        return(
            <div className={this.props.className + " progress"}>
                <div className="progress-bar" style={width}></div>
            </div>
        );
    }
}