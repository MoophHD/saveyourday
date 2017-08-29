'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var global = {
  startTime: new Date()
};

var LocalTimeLine = function (_React$Component) {
  _inherits(LocalTimeLine, _React$Component);

  function LocalTimeLine() {
    _classCallCheck(this, LocalTimeLine);

    return _possibleConstructorReturn(this, (LocalTimeLine.__proto__ || Object.getPrototypeOf(LocalTimeLine)).apply(this, arguments));
  }

  _createClass(LocalTimeLine, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', null);
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
    key: 'render',
    value: function render() {
      return React.createElement('div', null);
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
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(LocalTimeLine, null),
        React.createElement(GlobalTimeLine, null)
      );
    }
  }]);

  return TimeLine;
}(React.Component);

var CurrentWorkTime = function (_React$Component4) {
  _inherits(CurrentWorkTime, _React$Component4);

  function CurrentWorkTime(props) {
    _classCallCheck(this, CurrentWorkTime);

    var _this4 = _possibleConstructorReturn(this, (CurrentWorkTime.__proto__ || Object.getPrototypeOf(CurrentWorkTime)).call(this, props));

    _this4.state = {
      workTime: 0
    };
    return _this4;
  }

  _createClass(CurrentWorkTime, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this5 = this;

      this.calculateWorkTime();
      this.timerID = setInterval(function () {
        return _this5.calculateWorkTime();
      }, 1000 //3600000
      );
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: 'calculateWorkTime',
    value: function calculateWorkTime() {
      var result = [];

      var startTimeSecs = dateSecConverter(this.props.startTime);
      var finishTimeSecs = this.props.finishTime ? dateSecConverter(this.props.finishTime) : null;
      var now = new Date();
      var nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      result = finishTimeSecs ? finishTimeSecs - startTimeSecs : nowSecs - startTimeSecs;

      if (this.props.finishTime && this.props.finishTime[0] - this.props.startTime[0] < 0) {
        result += 86400;
      }
      var convResult = dateSecConverter(result);
      convResult = formatDate(convResult, ' : ');

      this.setState({ workTime: convResult });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.finishTime) clearInterval(this.timerID);
      return React.createElement(
        'div',
        null,
        this.state.workTime
      );
    }
  }]);

  return CurrentWorkTime;
}(React.Component);

var SubTimeCell = function (_React$Component5) {
  _inherits(SubTimeCell, _React$Component5);

  function SubTimeCell(props) {
    _classCallCheck(this, SubTimeCell);

    var _this6 = _possibleConstructorReturn(this, (SubTimeCell.__proto__ || Object.getPrototypeOf(SubTimeCell)).call(this, props));

    _this6.state = {
      break: ''
    };
    return _this6;
  }

  _createClass(SubTimeCell, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.currentState) {
        clearInterval(this.timerID);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this7 = this;

      this.setState({
        break: this.calculateBreakTime()
      });

      this.timerID = setInterval(function () {
        _this7.setState({
          break: _this7.calculateBreakTime()
        });
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: 'calculateBreakTime',
    value: function calculateBreakTime() {
      if (!this.props.lastFinishActivity) return '';

      var lastActTimeSecs = dateSecConverter(this.props.lastFinishActivity);

      var now = new Date();
      var nowSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      var breakTime = dateSecConverter(nowSecs - lastActTimeSecs);
      breakTime = formatDate(breakTime).split(':');

      if (breakTime[0] == '00') breakTime.shift();

      return breakTime.join(' : ');
    }
  }, {
    key: 'render',
    value: function render() {
      //let breakLabel = this.state.break ? 'Break : ' : '';
      return React.createElement(
        'div',
        { className: 'subCell' },
        React.createElement(
          'p',
          null,
          this.state.break
        )
      );
    }
  }]);

  return SubTimeCell;
}(React.Component);

var TimeCell = function (_React$Component6) {
  _inherits(TimeCell, _React$Component6);

  function TimeCell(props) {
    _classCallCheck(this, TimeCell);

    return _possibleConstructorReturn(this, (TimeCell.__proto__ || Object.getPrototypeOf(TimeCell)).call(this, props));
  }

  _createClass(TimeCell, [{
    key: 'render',
    value: function render() {
      var tag = Object.keys(this.props.startPart)[0];

      var startTime = this.props.startPart[tag].split(':');
      var finishTime = this.props.finishPart[tag] ? this.props.finishPart[tag].split(':') : null;

      var formattedStartTime = startTime.slice(0, 2).join(' : ');
      var formattedFinishTime = finishTime ? finishTime.slice(0, 2).join(' : ') : '';
      return React.createElement(
        'div',
        { className: 'cellWrapper' },
        React.createElement(SubTimeCell, { currentState: this.props.currentState,
          parentCellId: this.props.id,
          lastFinishActivity: finishTime }),
        React.createElement(
          'div',
          { className: 'cell' },
          React.createElement(
            'div',
            { className: 'cellSb' },
            React.createElement(
              'div',
              null,
              tag
            ),
            React.createElement(CurrentWorkTime, {
              startTime: startTime,
              finishTime: finishTime
            })
          ),
          React.createElement(
            'div',
            { className: 'startPart timePt' },
            React.createElement(
              'div',
              null,
              'Start'
            ),
            React.createElement(
              'div',
              null,
              formattedStartTime
            )
          ),
          React.createElement(
            'div',
            { className: 'finishPart timePt' },
            React.createElement(
              'div',
              null,
              'Finish'
            ),
            React.createElement(
              'div',
              null,
              formattedFinishTime
            )
          )
        )
      );
    }
  }]);

  return TimeCell;
}(React.Component);

var TimeUl = function (_React$Component7) {
  _inherits(TimeUl, _React$Component7);

  function TimeUl(props) {
    _classCallCheck(this, TimeUl);

    return _possibleConstructorReturn(this, (TimeUl.__proto__ || Object.getPrototypeOf(TimeUl)).call(this, props));
  }

  _createClass(TimeUl, [{
    key: 'render',
    value: function render() {
      var initialList = this.props.list;
      var listItems = [];
      var blank = React.createElement('div', null);

      for (var i = 0, len = initialList.length; i < len; i += 2) {
        var startPart = initialList[i];

        var finishPart = len - i == 1 ? blank : initialList[i + 1];
        listItems.unshift(React.createElement(TimeCell, {
          key: '_timeCellId' + i,
          id: 'id' + i,
          startPart: startPart,
          finishPart: finishPart,
          currentState: this.props.currentState
        }));
      }

      return React.createElement(
        'div',
        { className: 'timeUi' },
        listItems
      );
    }
  }]);

  return TimeUl;
}(React.Component);

var View = function (_React$Component8) {
  _inherits(View, _React$Component8);

  function View(props) {
    _classCallCheck(this, View);

    var _this10 = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

    _this10.state = {
      isLineMode: false,
      zoom: 1
    };
    return _this10;
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {

      var viewMode = this.state.isLineMode ? React.createElement(TimeLine, null) : React.createElement(TimeUl, { currentState: this.props.currentState, list: this.props.listElems });

      return React.createElement(
        'div',
        { className: 'view' },
        viewMode
      );
    }
  }]);

  return View;
}(React.Component);

var TagForm = function (_React$Component9) {
  _inherits(TagForm, _React$Component9);

  function TagForm(props) {
    _classCallCheck(this, TagForm);

    var _this11 = _possibleConstructorReturn(this, (TagForm.__proto__ || Object.getPrototypeOf(TagForm)).call(this, props));

    _this11.state = {
      value: '',
      isHandlerAttached: _this11.props.autoFocus
    };

    _this11.handleSubmit = _this11.handleSubmit.bind(_this11);
    _this11.handleBlur = _this11.handleBlur.bind(_this11);
    _this11.handleFocus = _this11.handleFocus.bind(_this11);
    return _this11;
  }

  _createClass(TagForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('Mounted');
      var btnClickListener = function () {
        console.log('btnClick');
        this.handleSubmit();
      }.bind(this);

      document.querySelector('.controlStartBtn').onkeypress = function (e) {
        if (e.keyCode == 13) return false;
      };
      document.querySelector('.controlStartBtn').addEventListener("click", btnClickListener);

      this.windowListener = function (e) {
        if (e.keyCode == 13) this.handleSubmit();
      }.bind(this);

      if (!this.props.autoFocus) {
        window.addEventListener("keydown", this.windowListener);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      if (event) event.preventDefault();
      var tagName = this.state.value != '' ? this.state.value : 'None';

      this.props.onSubmit(tagName);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      var flag = this.state.isHandlerAttached;
      if (!flag) {
        window.addEventListener("keydown", this.windowListener);this.setState({ isHandlerAttached: !flag });
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var flag = this.state.isHandlerAttached;
      if (flag) {
        window.removeEventListener("keydown", this.windowListener);this.setState({ isHandlerAttached: !flag });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this12 = this;

      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement('input', { autoFocus: this.props.autoFocus,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: function onChange(e) {
            return _this12.handleChange(e);
          },
          type: 'text',
          value: this.state.value })
      );
    }
  }]);

  return TagForm;
}(React.Component);

var Tags = function (_React$Component10) {
  _inherits(Tags, _React$Component10);

  function Tags() {
    _classCallCheck(this, Tags);

    return _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).apply(this, arguments));
  }

  _createClass(Tags, [{
    key: 'render',
    value: function render() {
      var _this14 = this;

      return React.createElement(
        'div',
        { className: 'tagPanel' },
        React.createElement(
          'h2',
          null,
          'Add tag'
        ),
        React.createElement(TagForm, { onSubmit: function onSubmit(v) {
            return _this14.props.onTagSubmit(v);
          },
          autoFocus: true })
      );
    }
  }]);

  return Tags;
}(React.Component);

var EfficiencyLabel = function (_React$Component11) {
  _inherits(EfficiencyLabel, _React$Component11);

  function EfficiencyLabel(props) {
    _classCallCheck(this, EfficiencyLabel);

    var _this15 = _possibleConstructorReturn(this, (EfficiencyLabel.__proto__ || Object.getPrototypeOf(EfficiencyLabel)).call(this, props));

    _this15.workTime = 1;
    _this15.restTime = 1;

    _this15.lastState = _this15.props.state;

    _this15.lastAnchor;
    _this15.state = {
      effMode: false,
      effPerc: '0%',
      eff: '0h0m/0h0m'
    };
    _this15.calculateEfficiency = _this15.calculateEfficiency.bind(_this15);
    return _this15;
  }

  _createClass(EfficiencyLabel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this16 = this;

      var now = [global.startTime.getHours(), global.startTime.getMinutes(), global.startTime.getSeconds()];
      this.startTime = formatDate(now);
      this.lastCall = dateSecConverter(now);
      this.timerID = setInterval(function () {
        return _this16.calculateEfficiency();
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'calculateEfficiency',
    value: function calculateEfficiency() {
      var target = void 0,
          value = void 0;
      var now = new Date();
      var nowSecs = dateSecConverter([now.getHours(), now.getMinutes(), now.getSeconds()]);
      var anchor = this.props.anchor ? this.props.anchor[Object.keys(this.props.anchor)[0]] : null;

      if (!anchor) {
        // no activity yet

        value = nowSecs - dateSecConverter(this.startTime.split(':'));
        this.restTime = value;
      } else {
        value = nowSecs - this.lastCall;
        if (this.lastState == this.props.state) {
          //keeps working or resting
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

      var wrkTimeArray = dateSecConverter(this.workTime);
      var wholeTimeArray = dateSecConverter(this.workTime + this.restTime);
      var effDate = wrkTimeArray[0] + 'h' + wrkTimeArray[1] + 'm/' + wholeTimeArray[0] + 'h' + wholeTimeArray[1] + 'm';

      var perc = Math.round(this.workTime / (this.workTime + this.restTime) * 10000) / 100 + '%';
      this.setState({
        effPerc: perc,
        eff: effDate
      });
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(e) {
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this17 = this;

      var displayEff = this.state.effMode ? this.state.eff : this.state.effPerc;
      return React.createElement(
        'div',
        { onMouseDown: function onMouseDown(e) {
            return _this17.handleSelect(e);
          },
          onClick: function onClick() {
            return _this17.setState({ effMode: !_this17.state.effMode });
          }, className: 'workBreakLabel' },
        React.createElement(
          'h2',
          null,
          displayEff
        ),
        React.createElement(
          'p',
          null,
          'Goal:75%'
        )
      );
    }
  }]);

  return EfficiencyLabel;
}(React.Component);

var Control = function (_React$Component12) {
  _inherits(Control, _React$Component12);

  function Control() {
    _classCallCheck(this, Control);

    return _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).apply(this, arguments));
  }

  _createClass(Control, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var now = new Date();
      this.openingTime = now.getHours().toString() + ' : ' + now.getMinutes().toString();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this19 = this;

      var icon = this.props.currentState ? "fa-pause" : "fa-play";
      var btnStr = this.props.currentState ? 'Stop' : 'Start';

      var now = new Date();

      var hr = now.getHours();
      var mn = now.getMinutes();

      return React.createElement(
        'div',
        { className: 'controlPanel' },
        React.createElement(Tags, { currentState: this.props.currentState, onTagSubmit: function onTagSubmit(v) {
            return _this19.props.onTagChange(v);
          } }),
        React.createElement(
          'div',
          { className: 'controlStart' },
          React.createElement(
            'button',
            { className: 'controlStartBtn' },
            React.createElement('i', { className: "fa " + icon, 'aria-hidden': 'true' }),
            btnStr
          )
        ),
        React.createElement(EfficiencyLabel, { state: this.props.currentState, anchor: this.props.lastElem })
      );
    }
  }]);

  return Control;
}(React.Component);

var App = function (_React$Component13) {
  _inherits(App, _React$Component13);

  function App(props) {
    _classCallCheck(this, App);

    var _this20 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this20.id = 0;
    _this20.state = {
      isActive: false,
      currentTag: 'None',
      history: []
    };
    _this20.setTag = _this20.setTag.bind(_this20);
    return _this20;
  }

  _createClass(App, [{
    key: 'setTag',
    value: function setTag(tag) {
      var _ref;

      var currentState = this.state.isActive;
      var now = new Date();
      var history = this.state.history.concat([(_ref = {}, _defineProperty(_ref, tag, formatDate([now.getHours(), now.getMinutes(), now.getSeconds()])), _defineProperty(_ref, 'id', this.id++), _ref)]);

      this.setState({
        history: history,
        isActive: !currentState,
        currentTag: tag
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var lastHistoryPart = this.state.history[this.state.history.length - 1];

      var tag = Object.keys(lastHistoryPart)[0];
      var time = lastHistoryPart[tag];
      setCookie(tag, time, { expires: 86400 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (document.cookie) {
        var cookie = document.cookie;
        var lastCookie = cookie.split(': ')[cookie.split(': ').length - 1];
      }
      this.$e.addEventListener("click", function (e) {});
    }
  }, {
    key: 'render',
    value: function render() {
      var _this21 = this;

      var currentHistory = this.state.history;
      var lastHistoryElem = currentHistory[currentHistory.length - 1];

      return React.createElement(
        'div',
        { ref: function ref(e) {
            return _this21.$e = e;
          }, className: 'wrapper' },
        React.createElement(Control, { currentState: this.state.isActive,
          currentTag: this.state.currentTag,
          onTagChange: function onTagChange(v) {
            return _this21.setTag(v);
          },
          lastElem: lastHistoryElem }),
        React.createElement(View, { currentState: this.state.isActive,
          listElems: this.state.history })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { tagList: tags }), document.getElementById('root'));

var tags = ['JS', 'Drawing', 'English', 'Swedish'];

function formatDate(args) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';

  var h = 0,
      m = 0,
      s = 0;

  if (args.length > 1) {
    h = args[0];
    m = args[1];
    s = args[2];
  } else if (args.length == 1) {
    var _args = _slicedToArray(args, 3);

    h = _args[0];
    m = _args[1];
    s = _args[2];
  }

  h = h > 9 ? h.toString() : '0' + h.toString();
  m = m > 9 ? m.toString() : '0' + m.toString();
  if (s != undefined) {
    s = s > 9 ? s.toString() : '0' + s.toString();
    return h + separator + m + separator + s;
  } else {
    return h + separator + m;
  }
}

function dateSecConverter(value, separator) {
  var result = void 0;
  if (typeof value == 'number') {
    result = [];
    var hr = value / 3600 | 0;
    var mn = (value - hr * 3600) / 60 | 0;
    var sc = value % 60;

    result = result.concat(hr, mn, sc);

    if (separator) return result.join(separator);

    return result;
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object" || "string" && separator !== undefined) {
    if (typeof value == 'string') value = value.split(separator);
    result = 0;

    result += value[0] * 3600;
    result += value[1] * 60;
    result += parseInt(value[2]);

    return result;
  }
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
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