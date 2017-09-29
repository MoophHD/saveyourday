/* eslint-disable */
import React, {Component} from 'react'
import dateSecConverted from '../gist/dateSecConverter' // eslint-disable-line
import formatDate from '../gist/formatDate'

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.anchorSecs = 0;
        this.hasAlarmPlayed = false;
        this.state = {
            time: '00 : 00'
        }

        this.windowEnterListener = this.windowEnterListener.bind(this); 
        this.windowClickListener = this.windowClickListener.bind(this); 
        this.callSubmit = this.callSubmit.bind(this); 
    }

    componentDidMount() {
        this.props.cut ? this.setState({time: '00 : 00'}) : this.setState({time : '00 : 00 : 00'});
        this.anchorSecs = dateSecConverted(this.props.start);
        if (this.props.finish) {this.calculateTime(); return}
        this.id = setInterval(() => this.calculateTime(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.id);
    }

    calculateTime() {
        let now = new Date();
        let difference = dateSecConverted([now.getHours(), now.getMinutes(), now.getSeconds()]) - this.anchorSecs;

        if (!this.hasAlarmPlayed && this.props.alarm && !this.props.finish && difference > 600) {
            let sound = new Audio('http://soundjax.com/reddo/67560^alarma.mp3');
            sound.volume = .5;
            sound.addEventListener('ended',function(){
                this.pause();
                this.currentTime=0;
            });

            sound.play();
            
            this.hasAlarmPlayed = true;
        }
        
        if (this.props.finish) {
            difference = dateSecConverted(this.props.finish) - dateSecConverted(this.props.start);
            clearInterval(this.id);
        }

        
        if (Math.sign(difference) == -1) difference = 0;
        let resultArr =  formatDate(dateSecConverted(difference).split(':')).split(':');
        if (resultArr[0] == '00' && this.props.cut) resultArr.shift();

        let result = resultArr.join(' : ');
        this.setState({time: result})
    }

    handleClick(e) {
        if (!this.props.finish) return;
        let elem = e.target;
        if (elem.contentEditable == "true") return;

        elem.contentEditable = true;
        elem.focus();
        if (elem.innerHTML.split(' : ').length < 3) elem.innerHTML = '00 : ' + elem.innerHTML;

        this.elem = elem;
        this.setSubmitListener(elem);
    }

    setSubmitListener(elem) {
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

    callSubmit(elem) {
        let finDate = dateSecConverted(this.anchorSecs + dateSecConverted(elem.innerHTML, ' : '));
        if (finDate != this.props.finish) this.props.onSliceChange(this.props.id, finDate, false);

        this.removeSubmitListeners(elem, this.currTarget);        
    }

    removeSubmitListeners(elem) {
        window.removeEventListener("keydown", this.windowEnterListener);
        window.removeEventListener("click", this.windowClickListener);
        elem.contentEditable = "false";
        let arrDate = elem.innerHTML.split(' : ');
        if (arrDate[0] == '00' && this.props.cut) arrDate.shift();

        elem.innerHTML = arrDate.join(' : ');
    }

    render() {
        return(
            <div onClick={::this.handleClick} className="timer">
                {this.state.time}
            </div>
        )
    }
}