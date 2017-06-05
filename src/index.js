import React, { Component, PropTypes } from 'react';
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized'

const ramdomLargeNumber = 9999999999999;



export default class ReverseList extends Component {

  static propTypes = {
    autoHeight: PropTypes.bool,
    className: PropTypes.string,
    estimatedRowSize: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    noRowsRenderer: PropTypes.func.isRequired,
    onRowsRendered: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    rowRenderer: PropTypes.func.isRequired,
    scrollToAlignment: PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,
    scrollToIndex: PropTypes.number.isRequired,
    scrollTop: PropTypes.number,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    threshold: PropTypes.number.isRequired,
    list: PropTypes.array.isRequired
  };

  static defaultProps = {
    estimatedRowSize: 30,
    noRowsRenderer: () => null,
    onRowsRendered: () => null,
    onScroll: () => null,
    getListComponent: () => null,
    overscanRowCount: 10,
    scrollToAlignment: 'auto',
    scrollToIndex: -1,
    style: {},
    threshold: 50,
    list: []
  };

  constructor(props, context) {
    super(props, context)

    this.attachToButtom = true;
    this.scrollTop = ramdomLargeNumber;
    this.scrollHeight = -1;
    this.clientHeight = -1;
    this.listClass = '';
    this.toggleScroll = false;

    this._rowRenderer = this._rowRenderer.bind(this)
    this._onScroll = this._onScroll.bind(this)
    this._setRef = this._setRef.bind(this)
  }


  componentWillUpdate(nextProps, nextState) {
    if (this.props.list.length != nextProps.list.length) {
      this._scrollHandler(nextProps);
    }
  }




  render() {

    const { noRowsRenderer, scrollToIndex } = this.props

    return (
      <div className={'ReverseList'}>
        <InfiniteLoader
          isRowLoaded={(index)=> !!list[index]}
          rowCount={ramdomLargeNumber}
          loadMoreRows={function () { }}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  {...this.props}
                  ref={ref => this._setRef(ref)}
                  className={this.listClass}
                  width={width}
                  rowRenderer={this._rowRenderer}
                  onScroll={this._onScroll}
                  rowCount={this.props.list.length}
                  noRowsRenderer={noRowsRenderer}
                  scrollToRow={scrollToIndex}
                  scrollTop={this.scrollTop}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>

      </div>
    )
  }

  _scrollHandler(nextProps) {

    const addedHeight = function (maxIndex, _rowHeight) {
      let index = 0, totalHeight = 0;
      while (index <= maxIndex) {
        totalHeight += _rowHeight({index})
        index++;
      }
      return totalHeight;

    }

    if (this.attachToButtom) {
      this.scrollTop = this.listComponent.props.scrollTop == ramdomLargeNumber ? ramdomLargeNumber + 1 : ramdomLargeNumber;
    }
    else {
      if (this.props.list.length && nextProps.list[0] != this.props.list[0]) {

        this.scrollTop = addedHeight(nextProps.list.length - this.props.list.length - 1, nextProps.rowHeight) + this.scrollTop;
        if (this.scrollTop == this.listComponent.props.scrollTop) {
          this.scrollTop = this.scrollTop - 1;
        }
      }
    }
  }

  _setRef(ref) {
    const { getListComponent } = this.props;
    this.listComponent = ref;
    getListComponent(this.listComponent);
  }



  _onScroll({ clientHeight, scrollHeight, scrollTop }) {
    const { loadMoreRows, threshold } = this.props
    if (!scrollHeight || !clientHeight) return;
    this.scrollHeight = scrollHeight;
    this.clientHeight = clientHeight;
    this.scrollTop = scrollTop;
    if (scrollHeight < clientHeight) {
      this.listClass = 'resetOverFlow';
      return;
    }
    this.attachToButtom = scrollTop >= (scrollHeight - clientHeight) ? true : false;

    this.listClass = ''
    if (scrollTop <= threshold && !this.toggleScroll) {
      this.toggleScroll = true;
      setTimeout(() => this.toggleScroll = false, 300)
      loadMoreRows({ clientHeight, scrollHeight, scrollTop });
    }
  }


  _rowRenderer({ style, isScrolling, isVisible,index, ...rest }) {
    const { rowRenderer } = this.props
    if (isVisible) {
      if (this.clientHeight >= this.scrollHeight) {
       
        style = { ...style, top: this.clientHeight - this.scrollHeight + style.top };
      }
    }
    return rowRenderer({ style, isScrolling, isVisible, overFlow: this.clientHeight < this.scrollHeight,index, ...rest });

  }



}