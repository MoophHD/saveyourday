import React, { Component } from 'react'
import { bindActionCreators } from 'redux' // eslint-disable-line
import { connect } from 'react-redux'
import Control from '../components/Control'// eslint-disable-line
import ControlForm from '../components/ControlForm'
import Page from '../components/Page'// eslint-disable-line
import * as pageActions from '../actions/PageActions' // eslint-disable-line
import * as uiActions from '../actions/UIActions'// eslint-disable-line

class App extends Component {
  render() {
    const {chuncks, state, tag} = this.props; 
    const {slices} = this.props.timeSlices;
    const {toggleState, changeTag} = this.props.uiActions;

    return (
    <div className="app">
      <Control 
        state={state}
        tag={tag}>
        <ControlForm         
          state={state}
          onToggle={toggleState}
          onTagChange={changeTag} /> 
      </Control>
      <Page
            state={state}
            slices={slices}
            chuncks={chuncks}/>
    </div>)
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
