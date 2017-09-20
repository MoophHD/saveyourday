import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import TimeRow from './TimeRow'
import Timer from './Timer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import * as actions from '../actions/ControlTableActions'


class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workTime: 0
		}
  }

	render() {
      const {tagHistory, byId, allIds, lastDate, globalState, activeTag, actions} = this.props; 
      let { byId:tagById} = tagHistory; 

      const {editTag} = actions;

      let trueIdList = allIds.concat('active');
      trueIdList.shift();
      
      let listItems = trueIdList.map(function(id) {
        let startDate,
            finishDate,
            slice ,
            state,
            tag;
        if (id == 'active') {
          tag = activeTag;
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
            onTagChange={() => editTag}
            key={'row_'+id}
            tag={tag}
            start={startDate}
            finish={finishDate}
            timer={<Timer cut={false} start={startDate} finish={finishDate}/>}
            />
          )
        } else {
              return (<div className="breakTimer" key={'_breakID' + id}>
                  <Timer cut={true} start={startDate} finish={finishDate} alarm={true}/>
              </div>)
        }
      })

      listItems.reverse();

      return(
          <div className="page">
            {listItems}
          </div>
      )

        }
	}

Page.propTypes = {
  globalState: PropTypes.bool.isRequired
}

function mapStateToProps(state) {  // eslint-disable-line
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) // eslint-disable-line
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Page)
