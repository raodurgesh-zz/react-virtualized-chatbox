import React, { Component } from 'react';
import InputBox from './input-box';
import ChatBox from '../dist/index'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.listComponent = {};

    this.state = {
      list: [90, 91, 92,93]
    }

    this._rowRenderer = this._rowRenderer.bind(this);
    this._loadMoreRows = this._loadMoreRows.bind(this);
    this._getListComponent = this._getListComponent.bind(this);
    this._rowHeight = this._rowHeight.bind(this);
    this._onKeyBoardEnter = this._onKeyBoardEnter.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {

  }




  render() {
    return (
      <div>
        <ChatBox
          list={this.state.list}
          height={500}
          rowHeight={this._rowHeight}
          rowRenderer={this._rowRenderer}
          loadMoreRows={this._loadMoreRows}
          getListComponent={this._getListComponent}
        />
        <InputBox onEnter={this._onKeyBoardEnter} />
      </div>
    )
  }

  _rowHeight({ index }) {
    switch (index % 3) {
      case 1: return 40;
      case 2: return 60;
      default: return 100;
    }
  }

  _getListComponent(ref) {
    this.listComponent = ref;
  }

  _loadMoreRows(params) {
    setTimeout(() => {
      let list = [...this.state.list];
      for (let i = 0; i < 100; i++)
        list = params.append ? [...list, list[list.length - 1] + 1] : [list[0] - 1, ...list];
      this.setState({
        list
      })
    }, 2000)

  }

  _rowRenderer({ key, index, style, isVisible, overFlow, isScrolling }) {
    if (isVisible) {
      let row = (overFlow && index == 0) ? <div style ={{'textAlign': 'center'}} >Loading...</div> : ''
      let _style = index %2 ==0 ? {'backgroundColor': '#eee','paddingLeft':'5px'} :{'backgroundColor': '#ddd','paddingLeft':'5px'};
      return (
        <div key={key} style={{...style,..._style }} >
          {row}
          {this.state.list[index]}
        </div>
      )
    }
  }

  _onKeyBoardEnter(val){
    let list = [...this.state.list];
    list = [...list, val] 
    this.setState({ list })
  }

}
