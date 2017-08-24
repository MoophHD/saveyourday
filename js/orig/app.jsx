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

class TimeCell extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    let tag = Object.keys(this.props.startPart)[0];

    let finishPart = this.props.finishPart  ? <div className="finishPart timePt">
                                                <div>{tag}</div>
                                                <div>{this.props.finishPart[tag]}</div>
                                              </div> 
    : <div className="blank"></div>

    return(
      <div className="cell" >
        <div className="startPart timePt">
          <div>{tag}</div>
          <div>{this.props.startPart[tag]}</div>
        </div>
        {finishPart}
        <div className="cellSb"></div>
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
      console.log(len-1);
      console.log(finishPart);
      listItems.push(<TimeCell
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