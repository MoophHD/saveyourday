
import React, { Component } from 'react'
import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import Control from './Control'
import Page from './Page'
import ControlTable from './ControlTable'
import Notepad from '../components/Notepad'
import * as controlActions from '../actions/ControlActions'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTableExpanded: false
    }
  }

  /* eslint-disable */
  handleDrag({offset}) {
    let l = offset.left;
    let prevPerc, nextPerc, halfW = this.winW / 2;


    prevPerc = (l/halfW)*49;
    nextPerc = 98 - prevPerc;


    this.resizer.previousElementSibling.style.width = prevPerc + '%';    
    this.resizer.nextElementSibling.style.width = nextPerc + '%';
  }

  componentDidMount() {
    this.winW = $(window).width();
    this.$resizer = $(this.resizer);
    this.$resizer.draggable({axis: 'x',
        drag: (e, ui) => this.handleDrag(ui)      
    });

    if (Cookies.get('state')) {
      this.props.controlActions.resetState(JSON.parse(Cookies.get('state')));
    }
    window.addEventListener('beforeunload', () => this.handleUnload())
  }
  
  handleUnload() {
    let cookies = JSON.parse(Cookies.get('state'));
    
    
  }

  componentWillUnmount() {
    this.$resizer.draggable('destroy');
  }
  
  deleteCookies() {
    Cookies.remove('state');
  }

  toggleTable() {
    this.setState((prevState, props)=> { // eslint-disable-line
      return {isTableExpanded: !prevState.isTableExpanded}
    })
  }

  render() {
    const {tagHistory, state, timeSlices, tag} = this.props; 

    let { byId, allIds, lastDate} = timeSlices;
    return (
    <div className="app">
      <button onClick={::this.deleteCookies}>Get rid of cookies</button>
      <button onClick={::this.toggleTable}>ToggleTable</button>
      { this.state.isTableExpanded ? <ControlTable /> : null }
      <Control />
      <div className="mainView">
        <Notepad />
        <div className="viewResizer" ref={el => this.resizer = el}></div>
        <Page
              activeTag={tag}
              globalState={state}
              byId={byId}
              allIds={allIds}
              lastDate={lastDate}
              tagHistory={tagHistory}/>
      </div>
    </div>)
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
    controlActions: bindActionCreators(controlActions, dispatch) // eslint-disable-line
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
