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


class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1
    }
  }

  render() {
    let listItems = this.props.listElems.map((curr, ind) => {
      let key = Object.keys(curr)[0];
      console.log(curr);
      return <li className="timeSlice" key={'_id' + curr[key] + '' + ind}>{key+' : '+curr[key]}</li>
  })

    return(
      <div>
        <LocalTimeLine />
        <GlobalTimeLine />
        <ul>{listItems}</ul>
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
        <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
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
    let now = new Date();
    
    let hr = now.getHours();
    let mn = now.getMinutes();


    let currentDate = formatDate(hr, mn);
    return(

      <div className="controlPanel">
        <Tags onTagSubmit={(v) => this.props.onTagChange(v)}/>
        <div className="controlStart"><button onClick={this.props.onStartButtonClick}className="controlStartBtn"><i className={"fa " + icon} aria-hidden="true"></i>Start</button></div>
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