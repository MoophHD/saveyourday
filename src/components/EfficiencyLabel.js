/* eslint-disable */
import React, {Component} from 'react'
//import formatDate from '../gist/formatDate'
import dateSecConverter from '../gist/dateSecConverter'

class EfficiencyLabel extends Component {
    constructor(props) {
        super(props);
        this.workTime;
        this.time;
        this.lastState;
        this.state = {
            effPerc: '0%',
            effTime: '0h0m/0h0m',
            isPercMode: true
        }
    }

    componentWillReceiveProps({slices}) {
        if (slices.length > 0) this.addTimeToThis(slices[slices.length-1]);
    }

    addTimeToThis(slice) {
        let toAdd;
        toAdd = dateSecConverter(slice.finish) - dateSecConverter(slice.start);
        this.time += toAdd;
        if (slice.state) this.workTime += toAdd;
    }

    componentDidMount() {
        this.workTime = 0;
        this.time = 1;
        this.lastState = this.props.state;

        let slices = this.props.slices;

        let toAdd;
        for (let i = 0; i < slices.length - 1; i++) {
            this.addTimeToThis(slices[i]);
        }
        
        let now = new Date();
        this.lastCall = now.getSeconds() + now.getMilliseconds() / 1000;
        this.id = setInterval(() => this.updateState(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.id);
    }
        

    updateState() {
        let state = this.props.state;
        let lastCall = this.lastCall;

        let now = new Date();
        let call = now.getSeconds() + now.getMilliseconds() / 1000;
        
        let value = call > lastCall ? call - lastCall : 60 + call - lastCall;

        this.time += value;
        if (state) this.workTime += value;
        

        let resultPerc = Math.round(this.workTime / this.time * 10000)/100 + '%';

        this.setState((prevState, props) => { // eslint-disable-line
            return {effPerc: resultPerc}
        })
    }

    
    render() {


        return(
            <div onClick={() => {this.setState({isPercMode: !this.state.isPercMode})}}>
                {this.state.isPercMode ? this.state.effPerc : this.state.effTime};
            </div>
        )
    }
}

export default EfficiencyLabel;