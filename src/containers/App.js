import React, { Component } from 'react'
import { bindActionCreators } from 'redux' // eslint-disable-line
import { connect } from 'react-redux'
import Control from './Control'// eslint-disable-line
import Page from '../components/Page'// eslint-disable-line
import * as pageActions from '../actions/PageActions' // eslint-disable-line
import * as controlActions from '../actions/ControlActions'// eslint-disable-line

class App extends Component {
  render() {
    const {chuncks, state, tag, timeSlices} = this.props; // eslint-disable-line 
    return (
    <div className="app">
      <Control />
      <Page
            state={state}
            timeSlices={timeSlices}
            chuncks={chuncks}/>
    </div>)
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
    controlActions: bindActionCreators(controlActions, dispatch)  // eslint-disable-line
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
