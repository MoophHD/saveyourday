'use strict';

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

var View = function (_React$Component3) {
  _inherits(View, _React$Component3);

  function View(props) {
    _classCallCheck(this, View);

    var _this3 = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

    _this3.state = {
      zoom: 1
    };
    return _this3;
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      var listItems = this.props.listElems.map(function (curr, ind) {
        var key = Object.keys(curr)[0];
        console.log(curr);
        return React.createElement(
          'li',
          { className: 'timeSlice', key: '_id' + curr[key] + '' + ind },
          key + ' : ' + curr[key]
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(LocalTimeLine, null),
        React.createElement(GlobalTimeLine, null),
        React.createElement(
          'ul',
          null,
          listItems
        )
      );
    }
  }]);

  return View;
}(React.Component);

var TagForm = function (_React$Component4) {
  _inherits(TagForm, _React$Component4);

  function TagForm(props) {
    _classCallCheck(this, TagForm);

    var _this4 = _possibleConstructorReturn(this, (TagForm.__proto__ || Object.getPrototypeOf(TagForm)).call(this, props));

    _this4.state = {
      value: ''
    };
    return _this4;
  }

  _createClass(TagForm, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.onSubmit(this.state.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return React.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            return _this5.handleSubmit(e);
          } },
        React.createElement('input', { type: 'text', value: this.state.value, onChange: function onChange(e) {
            return _this5.handleChange(e);
          } })
      );
    }
  }]);

  return TagForm;
}(React.Component);

var Tags = function (_React$Component5) {
  _inherits(Tags, _React$Component5);

  function Tags(props) {
    _classCallCheck(this, Tags);

    return _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));
  }

  _createClass(Tags, [{
    key: 'render',
    value: function render() {
      var _this7 = this;

      return React.createElement(
        'div',
        { className: 'tagPanel' },
        React.createElement(
          'h2',
          null,
          'Add tag'
        ),
        React.createElement(TagForm, { onSubmit: function onSubmit(v) {
            return _this7.props.onTagSubmit(v);
          } })
      );
    }
  }]);

  return Tags;
}(React.Component);

var Control = function (_React$Component6) {
  _inherits(Control, _React$Component6);

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
      var _this9 = this;

      var icon = this.props.currentState ? "fa-pause" : "fa-play";
      var now = new Date();

      var hr = now.getHours();
      var mn = now.getMinutes();

      var currentDate = formatDate(hr, mn);
      return React.createElement(
        'div',
        { className: 'controlPanel' },
        React.createElement(Tags, { onTagSubmit: function onTagSubmit(v) {
            return _this9.props.onTagChange(v);
          } }),
        React.createElement(
          'div',
          { className: 'controlStart' },
          React.createElement(
            'button',
            { onClick: this.props.onStartButtonClick, className: 'controlStartBtn' },
            React.createElement('i', { className: "fa " + icon, 'aria-hidden': 'true' }),
            'Start'
          )
        ),
        React.createElement(
          'div',
          { className: 'startTime' },
          React.createElement(
            'h2',
            null,
            currentDate
          )
        )
      );
    }
  }]);

  return Control;
}(React.Component);

var App = function (_React$Component7) {
  _inherits(App, _React$Component7);

  function App(props) {
    _classCallCheck(this, App);

    var _this10 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this10.state = {
      isActive: false,
      currentTag: 'None',
      history: []
    };
    return _this10;
  }

  _createClass(App, [{
    key: 'setTag',
    value: function setTag(tag) {
      this.setState({
        currentTag: tag
      });
    }
  }, {
    key: 'startActivity',
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
    key: 'finishActivity',
    value: function finishActivity() {

      var tag = this.state.currentTag;
      var now = new Date();
      var history = this.state.history.concat([_defineProperty({}, tag, formatDate(now.getHours(), now.getMinutes(), now.getSeconds()))]);

      this.setState({
        history: history
      });
    }
  }, {
    key: 'toggleState',
    value: function toggleState() {
      var currentState = this.state.isActive;

      //currentState ? this.finishActivity() : this.startActivity();

      this.finishActivity();

      this.setState({
        isActive: !currentState
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this11 = this;

      return React.createElement(
        'div',
        { className: 'wrapper' },
        React.createElement(Control, { onTagChange: function onTagChange(v) {
            return _this11.setTag(v);
          },
          onStartButtonClick: function onStartButtonClick() {
            return _this11.toggleState();
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