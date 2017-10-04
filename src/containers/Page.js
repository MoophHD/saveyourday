/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import TimeRow from '../components/TimeRow'
import Timer from '../components/Timer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cookies from 'js-cookie'
import * as actions from '../actions/ControlTableActions'
import * as createjs from 'createjs-module';
import moment from 'moment';
import ColorHash from 'color-hash'

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

  init(target) {
    let originX = 0,
        originY = 0,
        offsetX = 250,
        offsetY = 150;

    this.stage = new createjs.Stage(target);
    let stage = this.stage;

    let mainCircle = new createjs.Shape();
    let circle = new createjs.Graphics.Circle(0, 0, 150);
    let color = new createjs.Graphics.Fill('lightgray');

    mainCircle.graphics.append(createjs.Graphics.beginCmd)
      .append(circle)
      .append(color);

    this.container = new createjs.Container();
    let container = this.container;

    container.x = offsetX;
    container.y = offsetY;
    mainCircle.x = offsetX;
    mainCircle.y = offsetY;

    stage.addChild(mainCircle, container );

    stage.update();

    this.redrawArcs();
    
    createjs.Ticker.setFPS(24);

    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
    function handleTick(event) {
        if (!event.paused) {
            this.redrawArcs();
        }
    }
  }

  redrawArcs() {
    this.container.removeAllChildren();

    let state = this.props.globalState;
    let activeTag = this.props.activeTag;
    let {allIds, byId, lastDate} = this.props.timeSlices;
    let {allIds:tagIds, byId:tagById} = this.props.tagHistory;

    let allTime = 0;
    let timeSpent = {};
    let oldAnchor = -Math.PI/2;

    lastDate = lastDate.split(':');
    let lDateMoment = moment({h: lastDate[0], m: lastDate[1], s:lastDate[2]});

    allIds.forEach(function(id) {
      let start = byId[id].start.split(':');
      let finish = byId[id].finish.split(':');
      
      let d1 = moment({h:start[0], m:start[1], s:start[2]});
      let d2 = moment({h:finish[0], m:finish[1], s:finish[2]});
      
      let diff = d2.diff(d1, 'seconds');

      if (tagIds.indexOf(id) != -1 ) {
        let tag = tagById[id];
        timeSpent[tag] = timeSpent[tag] ? timeSpent[tag] + diff : diff;
      }

      allTime += diff;
      
    }, this);

    let lastDateDiff = moment(new Date()).diff(lDateMoment, 'seconds');

    allTime += lastDateDiff;
    
    if (activeTag == '') {
      activeTag = 'None';
    }

    if (state) {
      timeSpent[activeTag] = timeSpent[activeTag] ? timeSpent[activeTag] + lastDateDiff : lastDateDiff;
    }

    

    for (let tag in timeSpent) {
      console.log(timeSpent);
      let anchor = oldAnchor + (timeSpent[tag] /allTime) * 2 * Math.PI;
      // let color = this.genColor();
      let colorHash = new ColorHash({saturation: 0.5, lightness: 0.5});
      let colorArr = colorHash.rgb(tag);

      let color = {r:colorArr[0], g:colorArr[1], b: colorArr[2]};

      let arcShape = new createjs.Shape();

      arcShape.graphics.f(createjs.Graphics.getRGB(color.r, color.g, color.b));
      arcShape.graphics.moveTo(0, 0);
      arcShape.graphics.arc(0, 0, 150, oldAnchor, anchor);

      

      oldAnchor = anchor;
      
      this.container.addChild(arcShape);
      this.stage.update();
    }
  }

  genColor() {
    return {r: ~~(Math.random()*255), g: ~~(Math.random()*255), b: ~~(Math.random()*255)}
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
            <canvas style={{display: this.state.showCanvas ? 'block' : 'none'}} className="pageCanvas" ref={(e) => this.init(e)} width="500" height="500"></canvas>
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
