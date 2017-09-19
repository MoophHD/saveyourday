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

        if (!this.hasAlarmPlayed && this.props.alarm && !this.props.finish && difference > 900) {
            let sound = new Audio('http://soundjax.com/reddo/67560^alarma.mp3');
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

    render() {
        return(
            <div className="timer">
                {this.state.time}
            </div>
        )
    }
}