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
      const {chuncks, slices} = this.props; // eslint-disable-line
      
      const { allIds, byId } = chuncks;

      let listItems = [];
  
      for (let i = 0, len = allIds.length; i < len; i += 2) {
        let realIndex = (len-i == 1 ) ? i : i+1;
        let startChunck = allIds[i];
        let startChunckDate = byId[startChunck].date;

        let tag = byId[startChunck].tag;
          
        let finishChunck = len-i == 1 ? null : allIds[i+1];
        let finishChunckDate = null;

        if (finishChunck) finishChunckDate = byId[finishChunck].date;
        let formattedStart = startChunckDate.split(':');
        formattedStart.pop();
        formattedStart = formattedStart.join(' : ');

        let formattedFinish = null; 
        if (finishChunckDate) {
          formattedFinish = startChunckDate.split(':');
          formattedFinish.pop();
          formattedFinish = formattedFinish.join(' : ');
        }
        
        listItems.unshift(<TimeRow
          key={realIndex}
          tag={tag}
          start={formattedStart}
          finish={formattedFinish}
          timer={<Timer start={startChunckDate} finish={finishChunckDate}/>}
        />
      )
      if (listItems.length % 2 == 1 && this.lastFinish && realIndex != len-1) {
        listItems.unshift(
          <div className="breakTimer" key={'_breakID' + realIndex}>
            <Timer cut={true} start={slices[realIndex+1].start} finish={slices[realIndex+1].finish}/>
          </div>)
      }

      if (finishChunckDate) {
        this.lastFinish = finishChunckDate;
      }
      } 
			return(
				<div className="page">
          {(allIds.length % 2 == 0 && allIds.length > 1) ? <div className="breakTimer"> 
                                                            <Timer cut={true} start={slices[slices.length-1].finish} />
                                                           </div>  
                                                          : null}
          {listItems}
        </div>
        )

        }
	}

Page.propTypes = {
	chuncks: PropTypes.object.isRequired
}