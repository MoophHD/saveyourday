class LocalTimeLine extends React.Component {
  render() {
    return(
      <div></div>
    )
  }
}

class GlobalTimeLine extends React.Component {
  render() {
    return(
      <div></div>
    )
  }
}

class TimeLine extends React.Component {
  render() {
    return(
      <div>
        <LocalTimeLine />
        <GlobalTimeLine />
      </div>
    )
  }
}

class CurrentWorkTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: 0,
      calls: 0
    }
  }

  componentDidMount() {
    this.calculateWorkTime();
    this.timerID = setInterval(
      () => this.calculateWorkTime(),
      1000 //3600000
    );
  }
    
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  calculateWorkTime() {
    let result = [];

    let startTimeSecs = this.dateSecConverter(this.props.startTime);    
    let finishTimeSecs = this.props.finishTime ? this.dateSecConverter(this.props.finishTime) : null;
    let now = new Date();
    let nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    result = finishTimeSecs ? (finishTimeSecs - startTimeSecs) : (nowSecs - startTimeSecs); 

    if (this.props.finishTime && this.props.finishTime[0] - this.props.startTime[0] < 0) {
      result += 86400; 
    }

    let convResult = this.dateSecConverter(result);
    convResult = formatDate(convResult[0], convResult[1], convResult[2]).split(':').join(' : ');
    
  
    this.setState({workTime: convResult});
  }

    dateSecConverter(value) {
      let result;

      if(typeof value == 'number') {
        result = [];
        console.log(value);
        result.push(value/3600|0);
        result.push(value/60|0);
        result.push(value%60);

        return result;
      } else {
        result = 0;

        result += value[0] * 3600;
        result += value[1] * 60;
        result += parseInt(value[2]);

        return result;

      }
    }

  render() {
    if (this.props.finishTime) clearInterval(this.timerID);
    return (
      <div>{this.state.workTime}</div>
    )
  }
}

class TimeCell extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    let tag = Object.keys(this.props.startPart)[0];

    let startTime = this.props.startPart[tag].split(':');
    let finishTime = this.props.finishPart[tag] ? this.props.finishPart[tag].split(':') : null;

    let formattedStartTime = startTime.slice(0, 2).join(' : ');
    let formattedFinishTime = finishTime ? finishTime.slice(0, 2).join(' : ') : '';

    return(
      <div className="cell" >
        <div className="startPart timePt">
          <div>Start</div>
          <div>{formattedStartTime}</div>
        </div>

        <div className="finishPart timePt">
            <div>Finish</div>
            <div>{formattedFinishTime}</div>
          </div> 

        <div className="cellSb">
          <div>{tag}</div>
          <CurrentWorkTime 
            startTime={startTime}
            finishTime={finishTime}
          />
        </div>
      </div>
    )
  }
}

class TimeUl extends React.Component {
  constructor(props) {
    super(props);
  } 
  
  render() {
    let initialList = this.props.list;
    let listItems = [];
    let blank = <div></div>;

    for (let i = 0, len = initialList.length; i < len; i += 2) {
      let startPart = initialList[i];

      let finishPart = len-i == 1 ? blank : initialList[i+1];
      listItems.unshift(<TimeCell
        key={'_timeCellId'+i}
        startPart={startPart}
        finishPart={finishPart}
      />)
    }

    return(
      <div className="timeUi">
        {listItems}
      </div>
    )
  }  
}



class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLineMode: false,
      zoom: 1
    }
  }

  render() {


  let viewMode = this.state.isLineMode ? <TimeLine /> : <TimeUl list={this.props.listElems} />

    return(
      <div className="view">
        {viewMode}
      </div>
    )
  }
}

class TagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" value={this.state.value} onBlur={(e) => this.handleSubmit(e)} onChange={(e) => this.handleChange(e)} />
      </form>
    )
  }
}


class Tags extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="tagPanel">
        <h2>Add tag</h2>
        <TagForm onSubmit={(v) => this.props.onTagSubmit(v)}/>
      </div>
    )
  }
}

class Control extends React.Component {
  componentDidMount() {
    let now = new Date();
    this.openingTime = now.getHours().toString() + ' : ' + now.getMinutes().toString();
  }

  render() {
    let icon = this.props.currentState ? "fa-pause" : "fa-play";
    let btnStr =  this.props.currentState ? 'Stop' : 'Start';

    let now = new Date();
    
    let hr = now.getHours();
    let mn = now.getMinutes();

   

    let currentDate = formatDate(hr, mn);
    return(

      <div className="controlPanel">
        <Tags onTagSubmit={(v) => this.props.onTagChange(v)}/>
        <div className="controlStart">
          <button onClick={this.props.onStartButtonClick}className="controlStartBtn">
            <i className={"fa " + icon} aria-hidden="true"></i>
            {btnStr}
          </button>
        </div>
        <div className="startTime"><h2>{currentDate}</h2></div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      currentTag: 'None',
      history: []
    }
  }

  setTag(tag) {
    this.setState({
      currentTag: tag
    })
  }

  
  startActivity() {
    alert('1');
    let tag = this.state.currentTag;
    let now = new Date();
    let history = this.state.history.concat([
      {
        [tag] : now.getHours().toString() + ':' + now.getMinutes().toString() + ':' + now.getSeconds().toString()
      }
    ]);
    this.setState(
      {
          history: history
      }
    ) 
  }


  finishActivity() {

    let tag = this.state.currentTag;
    let now = new Date();
    let history = this.state.history.concat([
      {
        [tag] : formatDate(now.getHours(), now.getMinutes(), now.getSeconds())
      }
    ]);

    this.setState(
      {
          history: history
      }
    )
  }

  toggleState() {
    let currentState = this.state.isActive;
    
    //currentState ? this.finishActivity() : this.startActivity();

    this.finishActivity();

    this.setState({
      isActive: !currentState
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Control  onTagChange={(v) => this.setTag(v)} 
                  onStartButtonClick={() => this.toggleState()} 
                  currentState={this.state.isActive}/>
        <View listElems={this.state.history}/>
      </div>
    )
  }
}

let tags = ['JS', 'Drawing', 'English', 'Swedish'];

ReactDOM.render(
  <App tagList={tags}/>,
  document.getElementById('root')
);

let global = {
  cellId: 0,
  sliceId: 0
}

function formatDate(h, m, s) {
  h = h > 9 ? h.toString() : '0' + h.toString();
  m = m > 9 ? m.toString() : '0' + m.toString();
  if (s != undefined) {
    s = s > 9 ? s.toString() : '0' + s.toString();
    return (h + ':' + m + ':' + s)
  } else {
    return (h + ' : ' + m);
  }
}