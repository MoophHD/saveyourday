
import React, { Component } from 'react'
import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import Control from './Control'
import Page from './Page'
import ControlTable from './ControlTable'
import Notepad from '../components/Notepad'
import * as controlActions from '../actions/ControlActions'
import formatDate from '../gist/formatDate'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTableExpanded: false
    }
  }

  handleDrag({offset}) {
    let l = offset.left;
    let prevPerc, nextPerc, halfW = this.winW / 2;


    prevPerc = (l/halfW)*49;
    nextPerc = 98 - prevPerc;


    this.resizer.previousElementSibling.style.width = prevPerc + '%';    
    this.resizer.nextElementSibling.style.width = nextPerc + '%';
  }

  componentWillMount() {
    if (Cookies.get('notepad')) {
      this.npValue = Cookies.get('notepad');
    }
    if (Cookies.get('state')) {
      this.props.controlActions.resetState(JSON.parse(Cookies.get('state')));
    }
  }

  componentDidMount() {
    this.winW = $(window).width();
    this.$resizer = $(this.resizer);
    this.$resizer.draggable({axis: 'x',
        drag: (e, ui) => this.handleDrag(ui)      
    });

    window.addEventListener('beforeunload', () => this.handleUnload())
  }
  
  handleUnload() {
    let cookieState = JSON.parse(Cookies.get('state'));
    let now = new Date();
    let nowForm = formatDate([now.getHours(), now.getMinutes(), now.getSeconds()]);
    let {toggleState, changeTag, appendSlice} = this.props.controlActions;
    

    if (cookieState.currentState && cookieState.tagHistory.allIds.length > 0) {
      changeTag(cookieState.currentTag);     
      appendSlice(nowForm);
      toggleState();
    }
    Cookies.remove('notepad');
    Cookies.set('notepad', document.querySelector('.notepadInput').value, {expires: 2});
  }

  componentWillUnmount() {
    this.$resizer.draggable('destroy');
  }
  
  deleteCookies() {
    Cookies.remove('state');
  }

  render() {
    const {tagHistory, state, timeSlices, tag} = this.props; 

    let { byId, allIds, lastDate} = timeSlices;
    return (
    <div className="app">
      <button onClick={::this.deleteCookies}>Get rid of cookies</button>
      { this.state.isTableExpanded ? <ControlTable /> : null }
      <Control />
      <div className="mainView">
        <Notepad cookiesValue={this.npValue ? this.npValue : ''}/>
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
