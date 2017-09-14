import React, { Component } from 'react' // eslint-disable-line
import { bindActionCreators } from 'redux' // eslint-disable-line
import { connect } from 'react-redux'
import PropTypes from 'prop-types' // eslint-disable-line
import ControlForm from '../components/ControlForm'
import EfficiencyLabel from '../components/EfficiencyLabel'
import * as controlActions from '../actions/ControlActions'// eslint-disable-line


class Control extends Component {
    render() {
        const { state, tag, timeSlices } = this.props;
        const {toggleState, changeTag, appendSlice} = this.props.controlActions;
        const { slices, lastDate } = timeSlices;
        
        return(
            <div className="controlPanel">
                <ControlForm   
                    tag={tag}      
                    state={state}
                    onToggle={toggleState}
                    onTagChange={changeTag}
                    onSliceAdd={appendSlice} />
                <button onClick={() => toggleState()}>{state ? 'STOP' : 'START'}</button>
                <EfficiencyLabel slices={slices} lastDate={lastDate} state={state}/>
            </div>
        )
    }
}


Control.propTypes = {
    state: PropTypes.bool.isRequired
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