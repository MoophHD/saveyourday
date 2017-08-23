"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "form",
        { onSubmit: function onSubmit(e) {
            return _this5.handleSubmit(e);
          } },
        React.createElement("input", { type: "text", value: this.state.value, onChange: function onChange(e) {
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
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "tagPanel" },
        React.createElement(
          "h2",
          null,
          "Add tag"
        ),
        React.createElement(TagForm, null)
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var now = new Date();
      this.openingTime = now.getHours().toString() + ' : ' + now.getMinutes().toString();
    }
  }, {
    key: "render",
    value: function render() {
      var icon = this.props.currentState ? "fa-pause" : "fa-play";
      var now = new Date();
      var currentDate = now.getHours().toString() + ' : ' + now.getMinutes().toString();
      return React.createElement(
        "div",
        { className: "controlPanel" },
        React.createElement(Tags, null),
        React.createElement(
          "div",
          { className: "controlStart" },
          React.createElement(
            "button",
            { className: "controlStartBtn" },
            React.createElement("i", { className: "fa " + icon, "aria-hidden": "true" }),
            "Start"
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

var App = function (_React$Component7) {
  _inherits(App, _React$Component7);

  function App(props) {
    _classCallCheck(this, App);

    var _this8 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this8.state = {
      isActive: false
    };
    return _this8;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "wrapper" },
        React.createElement(Control, { currentState: this.state.isActive }),
        React.createElement(View, null)
      );
    }
  }]);

  return App;
}(React.Component);

var tags = ['JS', 'Drawing', 'English', 'Swedish'];

ReactDOM.render(React.createElement(App, { tagList: tags }), document.getElementById('root'));