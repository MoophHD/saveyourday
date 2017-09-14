/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
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
      const {chuncks, timeSlices} = this.props; // eslint-disable-line
      
      const { allIds, byId } = chuncks;
      const {slices, lastDate} = timeSlices
      let listItems = [];
      //let firstBreak = slices.shift(); 

      for (let i = 1, len = slices.length; i < len +1; i++) { // not rendering the 1st break
        let startDate,
            finishDate,
            toAppend,
            state = !slices[i-1].state,
            tag = byId[allIds[i-1]].tag;
        if (i == len) {
          startDate = lastDate;
          finishDate = null;
          
        } else {
          startDate = slices[i].start;
          finishDate = slices[i].finish;
        }

        if (state) {
          toAppend = <TimeRow 
            key={i}
            tag={tag}
            start={startDate}
            finish={finishDate}
            timer={<Timer cut={false} start={startDate} finish={finishDate}/>}
            />
        } else {
          toAppend = <div className="breakTimer" key={'_breakID' + i}>
                  <Timer cut={true} start={startDate} finish={finishDate}/>
              </div>
          }

          listItems.unshift(toAppend);
      } 



      return(
          <div className="page">
            {listItems}
          </div>
      )

        }
	}

Page.propTypes = {
	chuncks: PropTypes.object.isRequired
}