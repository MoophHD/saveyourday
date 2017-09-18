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
      const {tagHistory, byId, allIds, lastDate} = this.props; 
      let {allIds:tagIds, byId:tagById} = tagHistory; 
      let localTagCounter = 0;

      let listItems = allIds.map(function(id, ind, arr) {
        let startDate,
            finishDate,
            slice = byId[id],
            state = !slice.state
        if (ind == arr.length - 1) {
          startDate = lastDate;
          finishDate = null;
          
        } else {
          startDate = slice.start;
          finishDate = slice.finish;
        }

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
  state: PropTypes.bool.isRequired
}