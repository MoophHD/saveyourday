/*eslint-disable */
import React, {Component} from 'react'
import formatDate from '../gist/formatDate' 
import dateSecConverter from '../gist/dateSecConverter'


export default class TimeRow extends Component {
    constructor(props) {
        super(props);
        this.windowEnterListener = this.windowEnterListener.bind(this);        
    }

    componentDidMount() {

    }

    setEditable(elem) {
        elem.contentEditable = true;
        elem.focus();
    }

    handleTagLabelClick(e) {
        let elem = e.target;
        if (elem.contentEditable == "true") return;

        this.setEditable(elem);

        this.currTarget = 'tag';
        this.setSubmitListener(elem);
    }

    handleStartChunckClick(e) {
        let elem = e.target;
        if (elem.contentEditable == "true") return;

        elem.innerHTML = this.props.start;
        this.setEditable(elem);   

        this.currTarget = 'startChunck';
        this.setSubmitListener(elem);
    }

    handleFinishChunckClick(e) {

        let elem = e.target;
        if (elem.contentEditable == "true") return;

        elem.innerHTML = this.props.start;
        this.setEditable(elem); 

        this.currTarget = 'finishChunck';
        this.setSubmitListener(elem);
    }

    setSubmitListener(elem) {
        window.addEventListener("keydown", this.windowEnterListener);
    }

    submitListener(e, target) {
        if (e.keyCode == 13) {
            e.preventDefault();        
            switch (target) {
                case 'tag':
                    if (e.target.innerHTML === this.props.tag) break;

                    this.props.onTagChange(this.props.id, e.target.innerHTML);
                    break;
                case 'startChunck':
                    if (e.target.innerHTML === this.props.start) break;
                
                    this.props.onSliceChange(this.props.id, e.target.innerHTML, true);
                    break;
                case 'finishChunck':
                    if (e.target.innerHTML === this.props.finish) break;
                
                    this.props.onSliceChange(this.props.id, e.target.innerHTML, false);
                    break;
                default:
                    break
            }     
            this.removeSubmitListener(e.target, this.currTarget);            
        }
    }

    removeSubmitListener(elem, stateTarget) {
        window.removeEventListener("keydown", this.windowEnterListener);
        elem.contentEditable = "false";
        console.log(stateTarget);
        if (stateTarget == 'startChunck' || stateTarget == 'finishChunck') {
            console.log('1');
            elem.innerHTML = this.localFormatDate(elem.innerHTML);
        }
    }

    localFormatDate(d) {
        let formatted = d.split(':');
        formatted.pop();
        return formatted.join(' : ');
    }

    windowEnterListener(e) {
        this.submitListener(e, this.currTarget)
    }


    render() {
        const {start, finish, timer, tag} = this.props;
        let localFormatDate = this.localFormatDate;
        let timeDisplay = finish ? formatDate(dateSecConverter(dateSecConverter(finish) - dateSecConverter(start)).split(':'), ' : ') : timer;

        let formattedStart = localFormatDate(start);

        let formattedFinish = null;
        if (finish) formattedFinish = localFormatDate(finish);
        return( 
        <div className="timeRow">
            <div className="tagLabel" onClick={::this.handleTagLabelClick}>{tag ? tag : 'None'}</div> 
            <div className="workTime">
                {timeDisplay}
            </div>
            <div className="startChunck">
                <div>Start</div>
                <div onClick={::this.handleStartChunckClick}>{formattedStart}</div>
            </div>  
            <div className="finishChunck">
                <div>Finish</div>
                <div onClick={::this.handleFinishChunckClick}>{formattedFinish}</div>
            </div>
        </div>
        )
    }
}