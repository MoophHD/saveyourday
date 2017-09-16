/* eslint-disable */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import Control from './Control'
import Page from '../components/Page'
import * as controlActions from '../actions/ControlActions'


class App extends Component {


  componentDidMount() {
    if (Cookies.get('state')) {
      this.props.controlActions.resetState(JSON.parse(Cookies.get('state')));
    }
  }

  deleteCookies() {
    Cookies.remove('state');
  }

  render() {
    const {chuncks, state, timeSlices} = this.props; 
    return (
    <div className="app">
      <button onClick={::this.deleteCookies}>Get rid of cookies</button>
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
    timeSlices: state.control.timeSlices,
    tag: state.control.currentTag
  }
}

function mapDispatchToProps(dispatch) {
  return {
    controlActions: bindActionCreators(controlActions, dispatch)  // eslint-disable-line
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
