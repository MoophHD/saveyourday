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
      const {chuncks, slices, tag} = this.props; // eslint-disable-line
      
      const { allIds, byId } = chuncks;

      let listItems = [];
  
      for (let i = 0, len = allIds.length; i < len; i += 2) {
        let startChunck = allIds[i];
        let startChunckDate = byId[startChunck].date;
  
        let finishChunck = len-i == 1 ? null : allIds[i+1];
        let finishChunckDate = null;

        if (finishChunck) finishChunckDate = byId[finishChunck].date;
        let formattedStart = startChunckDate.split(':');
        formattedStart.pop();
        formattedStart = formattedStart.join(' : ');

        let formattedFinish = null; 
        if (finishChunckDate) {
          console.log('1');
          formattedFinish = startChunckDate.split(':');
          formattedFinish.pop();
          formattedFinish = formattedFinish.join(' : ');
        }
        
        listItems.unshift(<TimeRow
          key={i}
          tag={tag}
          start={formattedStart}
          finish={formattedFinish}
          timer={<Timer start={startChunckDate} finish={finishChunckDate}/>}
        />
      )
      if (listItems.length % 2 == 1 && this.lastFinish && i != len-2 && i != len-1) {
        console.log(this.lastFinish + ' : ' + startChunckDate);
        listItems.unshift(
          <div key={'_breakID' + i}>
            <Timer  start={this.lastFinish} finish={startChunckDate}/>
          </div>)
      }

      if (finishChunckDate) {
        this.lastFinish = finishChunckDate;
      }
      } 
			return(
				<div className="page">
          {(allIds.length % 2 == 0 && allIds.length > 1)? <Timer start={byId[allIds.length].date}/> : null}
          {listItems}
        </div>
        )

        }
	}

Page.propTypes = {
	chuncks: PropTypes.object.isRequired
}