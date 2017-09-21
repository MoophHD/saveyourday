/*eslint-disable */
import React, {Component} from 'react'
import formatDate from '../gist/formatDate' 
import dateSecConverter from '../gist/dateSecConverter'


export default class TimeRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWorkMode: true,
            tagValue: ''
        }
    }

    componentDidMount() {
        this.setState({tagValue: this.props.tag ? this.props.tag : 'None'});

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
        let elem = e.target;
        elem.contentEditable = "true";

        this.lastElem = elem;
        this.setSubmitListener(elem, 'tagValue');
    }

    setSubmitListener(target) {
        window.addEventListener("keydown", (e) => this.submitListener(e, target));
    }

    submitListener(e, target) {
        if (e.keyCode == 13) {
            e.preventDefault();        
            this.setState({
                [target] : this.lastElem.innerHTML
            })
            this.removeSubmitListener();
            this.props.onTagChange(this.props.id, this.lastElem.innerHTML);        
        }
    }

    removeSubmitListener() {
        this.lastElem.removeEventListener("keydown", () => this.submitListener());
        this.lastElem.contentEditable = "false";
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
            <div className="tagLabel" onClick={::this.handleTagLabelClick}>{tag ? tag : 'None'}</div> 
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