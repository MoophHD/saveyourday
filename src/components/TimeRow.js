import React, {Component} from 'react'

export default class TimeRow extends Component {
    render() {
        const {start, finish, timer} = this.props;
        return(
            <div className="timeRow">
                <div className="tagLabel">Test</div>
                <div className="workTime">
                    {timer}
                </div>
                <div className="startChunck">{start}</div>
                <div className="finishChunck">{finish}</div>
            </div>
        )
    }
}