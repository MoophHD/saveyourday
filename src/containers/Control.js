import React, { Component } from 'react' // eslint-disable-line
import { bindActionCreators } from 'redux' // eslint-disable-line
import { connect } from 'react-redux'
import PropTypes from 'prop-types' // eslint-disable-line
import ControlForm from '../components/ControlForm'
import * as uiActions from '../actions/UIActions'// eslint-disable-line


class Control extends Component {
    render() {
        console.log(this.props)
        const { state } = this.props;
        const {toggleState, changeTag} = this.props.uiActions;
        
        return(
            <div className="controlPanel">
                <h1 style={{padding: '10px'}}>{state ? 'ACTIVE' : 'INACTIVE'}</h1>
                <ControlForm         
                    state={state}
                    onToggle={toggleState}
                    onTagChange={changeTag} />
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
        chuncks: state.ui.chuncks,
        state: state.ui.currentState,
        tag: state.ui.currentTag,
        timeSlices: state.ui.timeSlices
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)