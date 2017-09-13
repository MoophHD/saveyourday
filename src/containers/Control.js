import React, { Component } from 'react' // eslint-disable-line
import { bindActionCreators } from 'redux' // eslint-disable-line
import { connect } from 'react-redux'
import PropTypes from 'prop-types' // eslint-disable-line
import ControlForm from '../components/ControlForm'
import * as controlActions from '../actions/ControlActions'// eslint-disable-line


class Control extends Component {
    render() {
        const { state, tag } = this.props;
        const {toggleState, changeTag, appendSlice} = this.props.controlActions;
        
        return(
            <div className="controlPanel">
                <h1 style={{padding: '10px'}}>{state ? 'ACTIVE' : 'INACTIVE'}</h1>
                <ControlForm   
                    tag={tag}      
                    state={state}
                    onToggle={toggleState}
                    onTagChange={changeTag}
                    onSliceAdd={appendSlice} />
                <button onClick={() => toggleState()}>{state ? 'STOP' : 'START'}</button>
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