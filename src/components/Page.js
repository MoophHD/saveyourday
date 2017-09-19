/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import TimeRow from './TimeRow'
import Timer from './Timer'

export default class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workTime: 0
		}
  }

	render() {
      const {tagHistory, byId, allIds, lastDate, globalState} = this.props; 
      let {allIds:tagIds, byId:tagById} = tagHistory; 
      let localTagCounter = 0;

      let trueIdList = allIds.concat('active');
      trueIdList.shift();
      console.log(trueIdList)
      let listItems = trueIdList.map(function(id, ind) {
        let startDate,
            finishDate,
            slice ,
            state;
        if (id == 'active') {
        
          startDate = lastDate;
          finishDate = null;
          state = globalState;
        } else {
          slice = byId[id];
          state = slice.state;
          startDate = slice.start;
          finishDate = slice.finish;
        }

        // console.log(`${startDate} : ${finishDate}`)
        // console.log(slice);
        

        console.log(state);
        if (state) {

          return(
            <TimeRow 
            key={'row_'+id}
            tag={tagById[tagIds[localTagCounter++]]}
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