/*eslint-disable */
import React, {Component} from 'react'
import formatDate from '../gist/formatDate' 
import dateSecConverter from '../gist/dateSecConverter'


export default class TimeRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWorkMode: true
        }
    }

    changeListener(e) {

    }

    setChangeHandler(elem) {
        
    }

    handleModeChange() {
        this.setState((prevState, props) => {
            return { isWorkMode: !prevState.isWorkMode}
        })
    }

    handleTagLabelClick(e) {
        e.target.innerHTML = '123';
    }

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
        return( //contentEditable={true} 
        <div className="timeRow" onClick={::this.handleModeChange}>
        <div className="tagLabel" >{tag ? tag : 'None'}</div> 
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