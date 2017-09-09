import React, {Component} from 'react'

export default class TimeRow extends Component {
    render() {
        const {start, finish, timer, tag} = this.props;
        return(
            <div className="timeRow">
                <div className="tagLabel">{tag ? tag : 'None'}</div>
                <div className="workTime">
                    {timer}
                </div>
                <div className="startChunck">
                    <div>Start</div>
                    <div>{start}</div>
                </div>
                <div className="finishChunck">
                    <div>Finish</div>
                    <div>{finish}</div>
                </div>
            </div>
        )
    }
}