import React, {Component} from 'react'
import dateSecConverter from '../gist/dateSecConverter'

class EfficiencyLabel extends Component {
    constructor(props) {
        super(props);
        this.initialWorkTime;
        this.initialTime;
        this.workTime;
        this.time;
        this.lastState;
        this.state = {
            effPerc: '0%',
            effTime: '0h0m/0h0m',
            isPercMode: true
        }
    }

    componentWillReceiveProps({timeSlices}) {
        let {byId, allIds} = timeSlices;

        this.clearValues();
        allIds.forEach((id) => {
            this.addTimeToThis(byId[id]);
        })
    }

    addTimeToThis(slice) {
        let toAdd;
        toAdd = dateSecConverter(slice.finish) - dateSecConverter(slice.start);
        this.time += toAdd;
        if (slice.state) this.workTime += toAdd;
    }

    clearValues() {
        this.workTime = 0;
        this.time = 1;
        this.initialTime = 0;
        this.initialWorkTime = 0;
    }

    componentDidMount() {
        this.clearValues();

        this.lastState = this.props.state;

        let {allIds, byId} = this.props.timeSlices;

        allIds.forEach(function(id) {
            this.addTimeToThis(byId[id]);
        }, this);
        
        let now = new Date();
        this.lastCall = now.getSeconds() + now.getMilliseconds() / 1000;

        this.id = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.id);
    }
     
    tick() {
        let state = this.props.state;
        let lastCall = this.lastCall;

        let now = new Date();
        let call = now.getSeconds() + now.getMilliseconds() / 1000;
        
        let value = (call > lastCall) ? call - lastCall : 60 + call - lastCall;

        this.lastCall = call;

        this.time += value;
        if (state) this.workTime += value;

        this.updateState();
        
    }

    updateState() {
        let wrkTime = dateSecConverter(this.workTime).split(':').slice(0, -1);
        let time = dateSecConverter(this.time).split(':').slice(0, -1);
 
        let resultPerc = Math.round(this.workTime / this.time * 10000)/100 + '%';
        let resultTime = `${wrkTime[0]}h${wrkTime[1]}m/${time[0]}h${time[1]}m`
        this.setState((prevState, props) => { // eslint-disable-line
            return {
                effPerc: resultPerc,
                effTime: resultTime
            }
        })
    }

    
    render() {


        return(
            <div className="effLabel" 
                onClick={() => {this.setState({isPercMode: !this.state.isPercMode})}}
                onSelectStart={(e) => e.preventDefault()} 
                onMouseDown={(e) => e.preventDefault()}
                >
                {this.state.isPercMode ? this.state.effPerc : this.state.effTime}
            </div>
        )
    }
}

export default EfficiencyLabel;