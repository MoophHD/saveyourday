/*eslint-disable */
import React, {Component} from 'react'
import formatDate from '../gist/formatDate' 
import dateSecConverter from '../gist/dateSecConverter'
/*eslint-enable */

export default class TimeRow extends Component {
    render() {
        const {start, finish, timer, tag} = this.props;
        let timeDisplay = finish ? formatDate(dateSecConverter(dateSecConverter(finish) - dateSecConverter(start)).split(':'), ' : ') : timer;

        let formattedStart = start.split(':');
        formattedStart.pop();
        formattedStart = formattedStart.join(' : ');

        let formattedFinish = null;
        if (finish){
            formattedFinish = finish.split(':');
            formattedFinish.pop();
            formattedFinish = formattedFinish.join(' : ');}
        return(
            <div className="timeRow">
                <div className="tagLabel">{tag ? tag : 'None'}</div>
                <div className="workTime">
                    {timeDisplay}
                </div>
                <div className="startChunck">
                    <div>Start</div>
                    <div>{formattedStart}</div>
                </div>
                <div className="finishChunck">
                    <div>Finish</div>
                    <div>{formattedFinish}</div>
                </div>
            </div>
        )
    }
}