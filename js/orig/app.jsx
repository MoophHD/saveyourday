let global = {
  startTime: new Date()
}

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

    let startTimeSecs = dateSecConverter(this.props.startTime);    
    let finishTimeSecs = this.props.finishTime ? dateSecConverter(this.props.finishTime) : null;
    let now = new Date();
    let nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    result = finishTimeSecs ? (finishTimeSecs - startTimeSecs) : (nowSecs - startTimeSecs); 

    if (this.props.finishTime && this.props.finishTime[0] - this.props.startTime[0] < 0) {
      result += 86400; 
    }
    let convResult = dateSecConverter(result);
    convResult = formatDate(convResult[0], convResult[1], convResult[2]).split(':').join(' : ');
    
  
    this.setState({workTime: convResult});
  }

  render() {
    if (this.props.finishTime) clearInterval(this.timerID);
    return (
      <div>{this.state.workTime}</div>
    )
  }
}

class SubTimeCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: ''
    }
  } 

  componentWillUpdate() {
    if (this.props.currentState && this.state.break != '') {
      clearInterval(this.timerID);
    }
  }

  componentDidMount() {
    this.setState({
      break: this.calculateBreakTime()
    });
    
    this.timerID = setInterval(
      () => {
        this.setState({
          break: this.calculateBreakTime()
        }) 
    },
      1000
    );
  }
    
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  calculateBreakTime() {
    if (!this.props.lastFinishActivity) return '';

    let lastActTimeSecs = dateSecConverter(this.props.lastFinishActivity);

    let now = new Date();
    let nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let breakTime = dateSecConverter(nowSecs - lastActTimeSecs);
    breakTime = formatDate(breakTime).split(':');

    if (breakTime[0] == '00') breakTime.shift();

    return breakTime.join(' : ');    
  }


  render() {
    //let breakLabel = this.state.break ? 'Break : ' : '';
    return (
      <div className="subCell">
        <p>{this.state.break}</p>
      </div>
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
    <div className="cellWrapper">
      <SubTimeCell  currentState={this.props.currentState}
                    parentCellId={this.props.id} 
                    lastFinishActivity={finishTime} />
      <div className="cell" >

        <div className="cellSb">
          <div>{tag}</div>
          <CurrentWorkTime 
            startTime={startTime}
            finishTime={finishTime}
          />
        </div>

        <div className="startPart timePt">
          <div>Start</div>
          <div>{formattedStartTime}</div>
        </div>

        <div className="finishPart timePt">
            <div>Finish</div>
            <div>{formattedFinishTime}</div>
          </div> 


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
        id={'id' + i}
        startPart={startPart}
        finishPart={finishPart}
        currentState={this.props.currentState}
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

  let viewMode = this.state.isLineMode ? <TimeLine /> : <TimeUl currentState={this.props.currentState} list={this.props.listElems} />

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
      value: '',
      isHandlerAttached: this.props.autoFocus,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    let btnListener = function() {
      this.handleSubmit();
    }.bind(this);

    document.querySelector('.controlStartBtn').addEventListener("click", btnListener);

    this.windowListener = function(e) {
      if (e.keyCode == 13) this.handleSubmit();
    }.bind(this);

    if (!this.props.autoFocus) {
      window.addEventListener("keydown", this.windowListener)
    }

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (event) event.preventDefault();
    let tagName = this.state.value != '' ? this.state.value : 'None';

    this.props.onSubmit(tagName);
  }

  handleBlur() {
    let flag = this.state.isHandlerAttached;
    if (!flag) {window.addEventListener("keydown", this.windowListener); this.setState({isHandlerAttached: !flag});} 
  }    

  handleFocus() {
    let flag = this.state.isHandlerAttached;
    if (flag) {window.removeEventListener("keydown", this.windowListener); this.setState({isHandlerAttached: !flag})} 
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input autoFocus={this.props.autoFocus}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
               onChange={(e) => this.handleChange(e)} 
               type="text" 
               value={this.state.value} />
      </form>
    )
  }
}


class Tags extends React.Component {

  render() {
    
    return(
      <div className="tagPanel">
        <h2>Add tag</h2>
        <TagForm onSubmit={(v) => this.props.onTagSubmit(v)}
                 autoFocus={true}/>
      </div>
    )
  }
}

class EfficiencyLabel extends React.Component {
  constructor(props) {
    super(props);

    this.workTime = 0;
    this.restTime = 0;

    this.lastState = this.props.state;

    this.lastAnchor;
    this.state = {
      effMode: false,
      effPerc: '0%',
      eff: '0h0m/0h0m'
    }
    this.calculateEfficiency = this.calculateEfficiency.bind(this);
  }

  componentDidMount() {
    this.startTime = formatDate(global.startTime.getHours(), global.startTime.getMinutes(), global.startTime.getSeconds());
    this.timerID = setInterval(
      () => this.calculateEfficiency(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillReceiveProps(nextProps) {
  }

  calculateEfficiency() {
    let target, value;
    let now = new Date();
    let nowSecs = dateSecConverter([now.getHours(), now.getMinutes(), now.getSeconds()]);
    let anchor = this.props.anchor ? this.props.anchor[Object.keys(this.props.anchor)[0]] : null;


    if (!anchor) { // no activity yet

      value = nowSecs - dateSecConverter(this.startTime.split(':'));
      this.restTime = value;
    } else {
        value = nowSecs - this.lastCall;

        if ( this.lastState == this.props.state) { // while keeping working or resting
          if (this.props.state) {
            this.workTime += value;
          } else {
            this.restTime += value;
          }
        } else {
          this.lastState = this.props.state;
        }
    }

    this.lastCall = nowSecs;

    console.log('workT : '+ this.workTime +';'+'restT : ' + this.restTime )

    let wrkTimeArray = dateSecConverter(this.workTime);
    let wholeTimeArray = dateSecConverter(this.workTime + this.restTime);
    let effDate = wrkTimeArray[0] + 'h' + wrkTimeArray[1] + 'm/' + wholeTimeArray[0] + 'h' + wholeTimeArray[1] + 'm';


    let perc = Math.round((this.workTime / (this.workTime + this.restTime))*10000)/100 + '%';
    this.setState( {
      effPerc: perc,
      eff: effDate
    })
  }

  handleSelect(e) {
    e.preventDefault();
  }

  render() {
    let displayEff = this.state.effMode ? this.state.eff : this.state.effPerc;
    return(
      <div onMouseDown={(e) => this.handleSelect(e)}
           onClick={() => this.setState({effMode : !this.state.effMode})} className="workBreakLabel">
        <h2 >{displayEff}</h2>
        <p>Goal:75%</p>
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
        <Tags currentState={this.props.currentState} onTagSubmit={(v) => this.props.onTagChange(v)}/>
        <div className="controlStart">
          <button className="controlStartBtn">
            <i className={"fa " + icon} aria-hidden="true"></i>
            {btnStr}
          </button>
        </div>
        <EfficiencyLabel state={this.props.currentState} anchor={this.props.lastElem}/>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = 0;
    this.state = {
      isActive: false,
      currentTag: 'None',
      history: []
    }
    this.setTag = this.setTag.bind(this);
  }

  setTag(tag) {
    let currentState = this.state.isActive;
    let now = new Date();
    let history = this.state.history.concat([
      {
        [tag] : formatDate(now.getHours(), now.getMinutes(), now.getSeconds()),
        id: this.id++
      }
    ]);

    this.setState(
      {
          history: history,
          isActive: !currentState,
          currentTag: tag
      }
    )
  }

  componentDidUpdate() {
    let lastHistoryPart = this.state.history[this.state.history.length - 1];

    let tag = Object.keys(lastHistoryPart)[0];
    let time = lastHistoryPart[tag];
    setCookie(tag, time, {expires: 86400});
  }

  componentDidMount() {
    if (document.cookie) {
      let cookie = document.cookie;
      let lastCookie = cookie.split(': ')[cookie.split(': ').length - 1];
    }
    this.$e.addEventListener("click", function(e) {
    })
  }

  render() {
    let currentHistory = this.state.history;
    let lastHistoryElem = currentHistory[currentHistory.length - 1];

    return (
      <div ref={e => this.$e = e} className="wrapper">
        <Control  currentState={this.state.isActive}
                  currentTag={this.state.currentTag}
                  onTagChange={(v) => this.setTag(v)}
                  lastElem={lastHistoryElem}/>
        <View   currentState={this.state.isActive}
                listElems={this.state.history}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App tagList={tags}/>,
  document.getElementById('root')
);

let tags = ['JS', 'Drawing', 'English', 'Swedish'];



function formatDate(...args) {
  let h = 0, m = 0, s = 0;
  
  if (args.length > 1) {
    h = args[0];
    m = args[1];
    s = args[2];
  } else if (args.length == 1){
    [h, m, s] = args[0];
  }
  
  
  h = h > 9 ? h.toString() : '0' + h.toString();
  m = m > 9 ? m.toString() : '0' + m.toString();
  if (s != undefined) {
    s = s > 9 ? s.toString() : '0' + s.toString();
    return (h + ':' + m + ':' + s)
  } else {
    return (h + ' : ' + m);
  }
}

function dateSecConverter(value, separator) {
  let result;
  if(typeof value == 'number') {
    result = [];
    let hr = value/3600|0;
    let mn = (value-hr*3600)/60|0;
    let sc = value%60;

    return result.concat(hr, mn, sc);
  } else {
    result = 0;

    result += value[0] * 3600;
    result += value[1] * 60;
    result += parseInt(value[2]);

    return result;

  }
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}