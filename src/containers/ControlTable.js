/* eslint-disable */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import * as actions from '../actions/ControlTableActions'

class ControlTable extends Component() {
    render() {
        const {tagHistory} = this.props;
        let {allIds:tagIds, byId:tagById} = tagHistory;         
        
        return(
        <div className="controlTable">
            <ul>
                {tagHistory.tagIds.map((id) => <li>{tagById[id]}</li>)}
            </ul>
        </div>
        )

    }
}

function mapStateToProps(state) {
    return {
      tagHistory: state.control.tagHistory,
      state: state.control.currentState,
      timeSlices: state.control.timeSlices,
      tag: state.control.currentTag
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch) 
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(App)