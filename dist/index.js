'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ramdomLargeNumber = 9999999999999;

var ReverseList = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ReverseList, _Component);

  function ReverseList(props, context) {
    (0, _classCallCheck3.default)(this, ReverseList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReverseList.__proto__ || (0, _getPrototypeOf2.default)(ReverseList)).call(this, props, context));

    _this.attachToButtom = true;
    _this.scrollTop = ramdomLargeNumber;
    _this.scrollHeight = -1;
    _this.clientHeight = -1;
    _this.listClass = '';
    _this.toggleScroll = false;

    _this._rowRenderer = _this._rowRenderer.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._setRef = _this._setRef.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ReverseList, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.list.length != nextProps.list.length) {
        this._scrollHandler(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          noRowsRenderer = _props.noRowsRenderer,
          scrollToIndex = _props.scrollToIndex;


      return _react2.default.createElement(
        'div',
        { className: 'ReverseList' },
        _react2.default.createElement(
          _reactVirtualized.InfiniteLoader,
          {
            isRowLoaded: function isRowLoaded(index) {
              return !!list[index];
            },
            rowCount: ramdomLargeNumber,
            loadMoreRows: function loadMoreRows() {}
          },
          function (_ref) {
            var onRowsRendered = _ref.onRowsRendered,
                registerChild = _ref.registerChild;
            return _react2.default.createElement(
              _reactVirtualized.AutoSizer,
              { disableHeight: true },
              function (_ref2) {
                var width = _ref2.width;
                return _react2.default.createElement(_reactVirtualized.List, (0, _extends3.default)({}, _this2.props, {
                  ref: function ref(_ref3) {
                    return _this2._setRef(_ref3);
                  },
                  className: _this2.listClass,
                  width: width,
                  rowRenderer: _this2._rowRenderer,
                  onScroll: _this2._onScroll,
                  rowCount: _this2.props.list.length,
                  noRowsRenderer: noRowsRenderer,
                  scrollToRow: scrollToIndex,
                  scrollTop: _this2.scrollTop
                }));
              }
            );
          }
        )
      );
    }
  }, {
    key: '_scrollHandler',
    value: function _scrollHandler(nextProps) {

      var addedHeight = function addedHeight(maxIndex, _rowHeight) {
        var index = 0,
            totalHeight = 0;
        while (index <= maxIndex) {
          totalHeight += _rowHeight({ index: index });
          index++;
        }
        return totalHeight;
      };

      if (this.attachToButtom) {
        this.scrollTop = this.listComponent.props.scrollTop == ramdomLargeNumber ? ramdomLargeNumber + 1 : ramdomLargeNumber;
      } else {
        if (this.props.list.length && nextProps.list[0] != this.props.list[0]) {

          this.scrollTop = addedHeight(nextProps.list.length - this.props.list.length - 1, nextProps.rowHeight) + this.scrollTop;
          if (this.scrollTop == this.listComponent.props.scrollTop) {
            this.scrollTop = this.scrollTop - 1;
          }
        }
      }
    }
  }, {
    key: '_setRef',
    value: function _setRef(ref) {
      var getListComponent = this.props.getListComponent;

      this.listComponent = ref;
      getListComponent(this.listComponent);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref4) {
      var _this3 = this;

      var clientHeight = _ref4.clientHeight,
          scrollHeight = _ref4.scrollHeight,
          scrollTop = _ref4.scrollTop;
      var _props2 = this.props,
          loadMoreRows = _props2.loadMoreRows,
          threshold = _props2.threshold;

      if (!scrollHeight || !clientHeight) return;
      this.scrollHeight = scrollHeight;
      this.clientHeight = clientHeight;
      this.scrollTop = scrollTop;
      if (scrollHeight < clientHeight) {
        this.listClass = 'resetOverFlow';
        return;
      }
      this.attachToButtom = scrollTop >= scrollHeight - clientHeight ? true : false;

      this.listClass = '';
      if (scrollTop <= threshold && !this.toggleScroll) {
        this.toggleScroll = true;
        setTimeout(function () {
          return _this3.toggleScroll = false;
        }, 300);
        loadMoreRows({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
      }
    }
  }, {
    key: '_rowRenderer',
    value: function _rowRenderer(_ref5) {
      var style = _ref5.style,
          isScrolling = _ref5.isScrolling,
          isVisible = _ref5.isVisible,
          index = _ref5.index,
          rest = (0, _objectWithoutProperties3.default)(_ref5, ['style', 'isScrolling', 'isVisible', 'index']);
      var rowRenderer = this.props.rowRenderer;

      if (isVisible) {
        if (this.clientHeight >= this.scrollHeight) {

          style = (0, _extends3.default)({}, style, { top: this.clientHeight - this.scrollHeight + style.top });
        }
      }
      return rowRenderer((0, _extends3.default)({ style: style, isScrolling: isScrolling, isVisible: isVisible, overFlow: this.clientHeight < this.scrollHeight, index: index }, rest));
    }
  }]);
  return ReverseList;
}(_react.Component), _class.propTypes = {
  autoHeight: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  estimatedRowSize: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  noRowsRenderer: _react.PropTypes.func.isRequired,
  onRowsRendered: _react.PropTypes.func.isRequired,
  onScroll: _react.PropTypes.func.isRequired,
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,
  rowRenderer: _react.PropTypes.func.isRequired,
  scrollToAlignment: _react.PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,
  scrollToIndex: _react.PropTypes.number.isRequired,
  scrollTop: _react.PropTypes.number,
  style: _react.PropTypes.object,
  tabIndex: _react.PropTypes.number,
  threshold: _react.PropTypes.number.isRequired,
  list: _react.PropTypes.array.isRequired
}, _class.defaultProps = {
  estimatedRowSize: 30,
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  getListComponent: function getListComponent() {
    return null;
  },
  overscanRowCount: 10,
  scrollToAlignment: 'auto',
  scrollToIndex: -1,
  style: {},
  threshold: 50,
  list: []
}, _temp);
exports.default = ReverseList;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ramdomLargeNumber, 'ramdomLargeNumber', 'src/index.js');

  __REACT_HOT_LOADER__.register(ReverseList, 'ReverseList', 'src/index.js');
}();

;