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
    return(
      <div>
        <LocalTimeLine />
        <GlobalTimeLine />
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
        <TagForm />
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
    let currentDate = now.getHours().toString() + ' : ' + now.getMinutes().toString();
    return(

      <div className="controlPanel">
        <Tags />
        <div className="controlStart"><button className="controlStartBtn"><i className={"fa " + icon} aria-hidden="true"></i>Start</button></div>
        <div className="startTime"><h2>{currentDate}</h2></div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Control currentState={this.state.isActive}/>
        <View />
      </div>
    )
  }
}

let tags = ['JS', 'Drawing', 'English', 'Swedish'];

ReactDOM.render(
  <App tagList={tags}/>,
  document.getElementById('root')
);