import React, { Component } from 'react' // eslint-disable-line
import { bindActionCreators } from 'redux' // eslint-disable-line
import { connect } from 'react-redux'
import PropTypes from 'prop-types' // eslint-disable-line
import ControlForm from '../components/ControlForm'
import EfficiencyLabel from '../components/EfficiencyLabel'
import * as controlActions from '../actions/ControlActions'// eslint-disable-line
import formatDate from '../gist/formatDate'


class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: true
        }
    }

    handleClick(e) {
        const {toggleState, appendSlice} = this.props.controlActions;
        let now = new Date();
        e.preventDefault();

        appendSlice(formatDate([now.getHours(), now.getMinutes(), now.getSeconds()], ':'));
        toggleState();                
        
    }

    render() {
        const { state, tag, timeSlices } = this.props;
        const {toggleState, changeTag, appendSlice} = this.props.controlActions;
        
        
        let icon = state ? 'fa-pause' : 'fa-play' 
        return(
            <div className="controlPanel">
                <ControlForm   
                    tag={tag}      
                    state={state}
                    onToggle={toggleState}
                    onTagChange={changeTag}
                    onSliceAdd={appendSlice} />
                <div className="controlBtn">
                    <button onClick={(e) => this.handleClick(e)}>
                        <i className={`fa ${icon}`}> </i>
                        {state ? 'STOP' : 'START'}
                    </button>
                </div>
                <div className="controlEfficency">
                    <EfficiencyLabel timeSlices={timeSlices} state={state} record={this.state.isRecording}/>   
                    <button onClick={() => this.setState({isRecording: !this.state.isRecording})}>{this.state.isRecording ? 'Pause record' : 'Continue record'}</button>                
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        chuncks: state.control.chuncks,
        state: state.control.currentState,
        tag: state.control.currentTag,
        timeSlices: state.control.timeSlices
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        controlActions: bindActionCreators(controlActions, dispatch) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

Control.propTypes = {
    state: PropTypes.bool.isRequired
}