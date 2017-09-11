import React, { Component } from 'react'
import { bindActionCreators } from 'redux' // eslint-disable-line
import { connect } from 'react-redux'
import Control from './Control'// eslint-disable-line
import Page from '../components/Page'// eslint-disable-line
import * as pageActions from '../actions/PageActions' // eslint-disable-line
import * as uiActions from '../actions/UIActions'// eslint-disable-line

class App extends Component {
  render() {
    const {chuncks, state, tag} = this.props; // eslint-disable-line 
    const {slices} = this.props.timeSlices;
    return (
    <div className="app">
      <Control />
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
    uiActions: bindActionCreators(uiActions, dispatch)  // eslint-disable-line
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
