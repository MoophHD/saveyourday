/* eslint-disable */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import * as actions from '../actions/ControlTableActions'

class ControlTable extends Component {
    render() {
        const {tagHistory, actions} = this.props;
        let {allIds:tagIds, byId:tagById} = tagHistory;
        let {removeTag} = actions;
        let toRenderTags = tagIds;
        toRenderTags.reverse();
        return(
        <div className="controlTable">
            <ul>
                {/* {toRenderTags.map((id) => <li key={'_' + id} id={id} onClick={(id) => removeTag(id)}>{tagById[id]}</li>)} */}
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
  

export default connect(mapStateToProps, mapDispatchToProps)(ControlTable)