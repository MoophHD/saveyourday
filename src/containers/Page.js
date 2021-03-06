/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import TimeRow from '../components/TimeRow'
import Timer from '../components/Timer'
import GraphCircle from '../components/GraphCircle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'
import * as actions from '../actions/ControlTableActions'
import TestCommand from '../components/TestCommand'


class Page extends Component {
	constructor(props) {
    super(props);
    this.state = {
      showCanvas: false
    }
  }

  componentWillMount() {
    this.clear = Cookies.get('state') ? false : true;
    (`mount, ${this.clear}`);
  }

  toggleCanvas() {
    this.setState((prev) => {
      return {
        showCanvas: !prev.showCanvas
      }
    })
  }


	render() {
      const {tagHistory, timeSlices, globalState, actions} = this.props; 
      let { byId:tagById, allIds: tagIds} = tagHistory; 
      let {allIds, byId, lastDate} = timeSlices
      const {editTag, editSlice} = actions;

      let trueIdList = allIds.concat('active');
      if (this.clear) {
        trueIdList.shift();
      } else {
        this.clear = true;
      }

      
      let listItems = trueIdList.map(function(id) {
        let startDate,
            finishDate,
            slice ,
            state,
            tag;
        if (id == 'active') {
          tag = tagById[tagIds[tagIds.length - 1]];
          startDate = lastDate;
          finishDate = null;
          state = globalState;
        } else {
          tag = tagById[id] ? tagById[id] : '';
          slice = byId[id];
          state = slice.state;
          startDate = slice.start;
          finishDate = slice.finish;
        }

        

        if (state) {
          return(
            <TimeRow 
            onSliceChange={(id, date, isStart) => editSlice(id, date, isStart)}
            onTagChange={(id, value) => editTag(id, value)}
            id={id}
            key={'row_'+id + startDate}
            tag={tag}
            start={startDate}
            finish={finishDate}
            timer={<Timer cut={false} start={startDate} finish={null}/>}
            />
          )
        } else {
              return (<div className="breakTimer" key={'_breakID' + id}>
                  <Timer onSliceChange={(id, date, isStart) => editSlice(id, date, isStart)} id={id} cut={true} start={startDate} finish={finishDate} alarm={true}/>
              </div>)
        }
      })

      listItems.reverse();

      return(
          <div className="page">
            <GraphCircle 
                show={this.state.showCanvas}
                globalState={this.props.globalState}
                activeTag={this.props.activeTag}
                timeSlices={this.props.timeSlices}
                tagHistory={this.props.tagHistory}
             />
            {listItems}
            <button className="toggleCanvasButton" onClick={() => {this.toggleCanvas()}}>Graph?</button>
          </div>
      )

        }
	}

Page.propTypes = {
  globalState: PropTypes.bool.isRequired
}

function mapStateToProps(state) {  // eslint-disable-line
  return {
    timeSlices: state.control.timeSlices
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) // eslint-disable-line
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Page)
