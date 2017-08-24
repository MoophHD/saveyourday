"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalTimeLine = function (_React$Component) {
  _inherits(LocalTimeLine, _React$Component);

  function LocalTimeLine() {
    _classCallCheck(this, LocalTimeLine);

    return _possibleConstructorReturn(this, (LocalTimeLine.__proto__ || Object.getPrototypeOf(LocalTimeLine)).apply(this, arguments));
  }

  _createClass(LocalTimeLine, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null);
    }
  }]);

  return LocalTimeLine;
}(React.Component);

var GlobalTimeLine = function (_React$Component2) {
  _inherits(GlobalTimeLine, _React$Component2);

  function GlobalTimeLine() {
    _classCallCheck(this, GlobalTimeLine);

    return _possibleConstructorReturn(this, (GlobalTimeLine.__proto__ || Object.getPrototypeOf(GlobalTimeLine)).apply(this, arguments));
  }

  _createClass(GlobalTimeLine, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null);
    }
  }]);

  return GlobalTimeLine;
}(React.Component);

var TimeLine = function (_React$Component3) {
  _inherits(TimeLine, _React$Component3);

  function TimeLine() {
    _classCallCheck(this, TimeLine);

    return _possibleConstructorReturn(this, (TimeLine.__proto__ || Object.getPrototypeOf(TimeLine)).apply(this, arguments));
  }

  _createClass(TimeLine, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(LocalTimeLine, null),
        React.createElement(GlobalTimeLine, null)
      );
    }
  }]);

  return TimeLine;
}(React.Component);

var TimeCell = function (_React$Component4) {
  _inherits(TimeCell, _React$Component4);

  function TimeCell(props) {
    _classCallCheck(this, TimeCell);

    return _possibleConstructorReturn(this, (TimeCell.__proto__ || Object.getPrototypeOf(TimeCell)).call(this, props));
  }

  _createClass(TimeCell, [{
    key: "render",
    value: function render() {
      var tag = Object.keys(this.props.startPart)[0];

      var finishPart = this.props.finishPart ? React.createElement(
        "div",
        { className: "finishPart timePt" },
        React.createElement(
          "div",
          null,
          tag
        ),
        React.createElement(
          "div",
          null,
          this.props.finishPart[tag]
        )
      ) : React.createElement("div", { className: "blank" });

      return React.createElement(
        "div",
        { className: "cell" },
        React.createElement(
          "div",
          { className: "startPart timePt" },
          React.createElement(
            "div",
            null,
            tag
          ),
          React.createElement(
            "div",
            null,
            this.props.startPart[tag]
          )
        ),
        finishPart,
        React.createElement("div", { className: "cellSb" })
      );
    }
  }]);

  return TimeCell;
}(React.Component);

var TimeUl = function (_React$Component5) {
  _inherits(TimeUl, _React$Component5);

  function TimeUl(props) {
    _classCallCheck(this, TimeUl);

    return _possibleConstructorReturn(this, (TimeUl.__proto__ || Object.getPrototypeOf(TimeUl)).call(this, props));
  }

  _createClass(TimeUl, [{
    key: "render",
    value: function render() {
      var initialList = this.props.list;
      var listItems = [];
      var blank = React.createElement("div", null);

      for (var i = 0, len = initialList.length; i < len; i += 2) {
        var startPart = initialList[i];

        var finishPart = len - i == 1 ? blank : initialList[i + 1];
        console.log(len - 1);
        console.log(finishPart);
        listItems.push(React.createElement(TimeCell, {
          key: '_timeCellId' + i,
          startPart: startPart,
          finishPart: finishPart
        }));
      }

      return React.createElement(
        "div",
        { className: "timeUi" },
        listItems
      );
    }
  }]);

  return TimeUl;
}(React.Component);

var View = function (_React$Component6) {
  _inherits(View, _React$Component6);

  function View(props) {
    _classCallCheck(this, View);

    var _this6 = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

    _this6.state = {
      isLineMode: false,
      zoom: 1
    };
    return _this6;
  }

  _createClass(View, [{
    key: "render",
    value: function render() {

      var viewMode = this.state.isLineMode ? React.createElement(TimeLine, null) : React.createElement(TimeUl, { list: this.props.listElems });

      return React.createElement(
        "div",
        { className: "view" },
        viewMode
      );
    }
  }]);

  return View;
}(React.Component);

var TagForm = function (_React$Component7) {
  _inherits(TagForm, _React$Component7);

  function TagForm(props) {
    _classCallCheck(this, TagForm);

    var _this7 = _possibleConstructorReturn(this, (TagForm.__proto__ || Object.getPrototypeOf(TagForm)).call(this, props));

    _this7.state = {
      value: ''
    };
    return _this7;
  }

  _createClass(TagForm, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.onSubmit(this.state.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      return React.createElement(
        "form",
        { onSubmit: function onSubmit(e) {
            return _this8.handleSubmit(e);
          } },
        React.createElement("input", { type: "text", value: this.state.value, onBlur: function onBlur(e) {
            return _this8.handleSubmit(e);
          }, onChange: function onChange(e) {
            return _this8.handleChange(e);
          } })
      );
    }
  }]);

  return TagForm;
}(React.Component);

var Tags = function (_React$Component8) {
  _inherits(Tags, _React$Component8);

  function Tags(props) {
    _classCallCheck(this, Tags);

    return _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));
  }

  _createClass(Tags, [{
    key: "render",
    value: function render() {
      var _this10 = this;

      return React.createElement(
        "div",
        { className: "tagPanel" },
        React.createElement(
          "h2",
          null,
          "Add tag"
        ),
        React.createElement(TagForm, { onSubmit: function onSubmit(v) {
            return _this10.props.onTagSubmit(v);
          } })
      );
    }
  }]);

  return Tags;
}(React.Component);

var Control = function (_React$Component9) {
  _inherits(Control, _React$Component9);

  function Control() {
    _classCallCheck(this, Control);

    return _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).apply(this, arguments));
  }

  _createClass(Control, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var now = new Date();
      this.openingTime = now.getHours().toString() + ' : ' + now.getMinutes().toString();
    }
  }, {
    key: "render",
    value: function render() {
      var _this12 = this;

      var icon = this.props.currentState ? "fa-pause" : "fa-play";
      var btnStr = this.props.currentState ? 'Stop' : 'Start';

      var now = new Date();

      var hr = now.getHours();
      var mn = now.getMinutes();

      var currentDate = formatDate(hr, mn);
      return React.createElement(
        "div",
        { className: "controlPanel" },
        React.createElement(Tags, { onTagSubmit: function onTagSubmit(v) {
            return _this12.props.onTagChange(v);
          } }),
        React.createElement(
          "div",
          { className: "controlStart" },
          React.createElement(
            "button",
            { onClick: this.props.onStartButtonClick, className: "controlStartBtn" },
            React.createElement("i", { className: "fa " + icon, "aria-hidden": "true" }),
            btnStr
          )
        ),
        React.createElement(
          "div",
          { className: "startTime" },
          React.createElement(
            "h2",
            null,
            currentDate
          )
        )
      );
    }
  }]);

  return Control;
}(React.Component);

var App = function (_React$Component10) {
  _inherits(App, _React$Component10);

  function App(props) {
    _classCallCheck(this, App);

    var _this13 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this13.state = {
      isActive: false,
      currentTag: 'None',
      history: []
    };
    return _this13;
  }

  _createClass(App, [{
    key: "setTag",
    value: function setTag(tag) {
      this.setState({
        currentTag: tag
      });
    }
  }, {
    key: "startActivity",
    value: function startActivity() {
      alert('1');
      var tag = this.state.currentTag;
      var now = new Date();
      var history = this.state.history.concat([_defineProperty({}, tag, now.getHours().toString() + ':' + now.getMinutes().toString() + ':' + now.getSeconds().toString())]);
      this.setState({
        history: history
      });
    }
  }, {
    key: "finishActivity",
    value: function finishActivity() {

      var tag = this.state.currentTag;
      var now = new Date();
      var history = this.state.history.concat([_defineProperty({}, tag, formatDate(now.getHours(), now.getMinutes(), now.getSeconds()))]);

      this.setState({
        history: history
      });
    }
  }, {
    key: "toggleState",
    value: function toggleState() {
      var currentState = this.state.isActive;

      //currentState ? this.finishActivity() : this.startActivity();

      this.finishActivity();

      this.setState({
        isActive: !currentState
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this14 = this;

      return React.createElement(
        "div",
        { className: "wrapper" },
        React.createElement(Control, { onTagChange: function onTagChange(v) {
            return _this14.setTag(v);
          },
          onStartButtonClick: function onStartButtonClick() {
            return _this14.toggleState();
          },
          currentState: this.state.isActive }),
        React.createElement(View, { listElems: this.state.history })
      );
    }
  }]);

  return App;
}(React.Component);

var tags = ['JS', 'Drawing', 'English', 'Swedish'];

ReactDOM.render(React.createElement(App, { tagList: tags }), document.getElementById('root'));

var global = {
  cellId: 0,
  sliceId: 0
};

function formatDate(h, m, s) {
  h = h > 9 ? h.toString() : '0' + h.toString();
  m = m > 9 ? m.toString() : '0' + m.toString();
  if (s != undefined) {
    s = s > 9 ? s.toString() : '0' + s.toString();
    return h + ':' + m + ':' + s;
  } else {
    return h + ' : ' + m;
  }
}