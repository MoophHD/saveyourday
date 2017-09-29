/*eslint-disable */
import React, {Component} from 'react'
import formatDate from '../gist/formatDate' 
import dateSecConverter from '../gist/dateSecConverter'


export default class TimeRow extends Component {
    constructor(props) {
        super(props);
        this.windowEnterListener = this.windowEnterListener.bind(this); 
        this.windowClickListener = this.windowClickListener.bind(this);       
    }

    componentDidMount() {

    }

    setEditable(elem) {
        elem.contentEditable = true;
        elem.focus();
    }

    isLastElem(elem) {
        if (!this.elem || elem == this.elem) return true;
    }

    handleTagLabelClick(e) {
        if (!this.isLastElem(e.target)) return;

        let elem = e.target;
        if (elem.contentEditable == "true") return;

        this.setEditable(elem);

        this.currTarget = 'tag';
        this.elem = elem;
        this.setSubmitListener(elem);
    }

    handleStartChunckClick(e) {
        if (!this.isLastElem(e.target)) return;
        
        let elem = e.target;
        if (elem.contentEditable == "true") return;

        elem.innerHTML = this.props.start;
        this.setEditable(elem);   

        this.currTarget = 'startChunck';
        this.elem = elem;
        this.setSubmitListener(elem);
    }

    handleFinishChunckClick(e) {
        if (!this.isLastElem(e.target)) return;

        let elem = e.target;
        if (elem.contentEditable == "true") return;

        elem.innerHTML = this.props.finish;
        this.setEditable(elem); 

        this.currTarget = 'finishChunck';
        this.elem = elem;
        this.setSubmitListener();
    }

    setSubmitListener() {
        window.addEventListener("keydown", this.windowEnterListener);
        window.addEventListener("click", this.windowClickListener);
    }

    windowEnterListener(e) {
        if (e.keyCode == 13) {
            e.preventDefault();                
            this.callSubmit(this.elem);
        }
    }

    windowClickListener(e) {
        if (e.target.contentEditable == "true") {
            return;
        }
        
        this.callSubmit(this.elem);
    }

    removeSubmitListener(elem) {
        this.elem = null;
        window.removeEventListener("keydown", this.windowEnterListener);
        window.removeEventListener("click", this.windowClickListener);
        elem.contentEditable = "false";
        let stateTarget = this.currTarget;
        if (stateTarget == 'startChunck' || stateTarget == 'finishChunck') {
            elem.innerHTML = this.localFormatDate(elem.innerHTML);
        }
    }

    callSubmit(elem) {
        switch (this.currTarget) {
            case 'tag':
                if (elem.innerHTML === this.props.tag) break;

                this.props.onTagChange(this.props.id, elem.innerHTML);
                break;
            case 'startChunck':
                if (elem.innerHTML === this.props.start) break;
            
                this.props.onSliceChange(this.props.id, elem.innerHTML, true);
                break;
            case 'finishChunck':
                if (elem.innerHTML === this.props.finish) break;
            
                this.props.onSliceChange(this.props.id, elem.innerHTML, false);
                break;
            default:
                break
        }     
        this.removeSubmitListener(elem, this.currTarget);   
    }

    localFormatDate(d) {
        let formatted = d.split(':');
        if (formatted.length > 2) formatted.pop();
        return formatted.join(' : ');
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