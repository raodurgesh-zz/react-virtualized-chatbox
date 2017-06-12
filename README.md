# React Virtualized CHATBOX

A React component that provides you with an infinite scrolling ChatBox, render million of items efficiently inspired by concept of virtualization.

![Alt text](https://github.com/raodurgesh/react-virtualized-chatbox/blob/master/chat.gif)

## Install
```
$ npm install react-virtualized-chatbox --save
```

## Usage

```
import ChatBox from 'react-virtualized-chatbox';

...

_loadMoreRows() {
  // @TODO Perform asychronous load of data
  }



_rowRenderer(row){
	 return (
        <div>
            Row {row.key + 1}
        </div>
    );
}


// Optional function to return dynamic row height
_rowHeight({ index }){
    return index < this.state.data.length ? this.state.data[index].height : 40;
}

// Optional function to return reference of virtualized list component 
_getListComponent(ref){
	this.listComponent = ref;
}


  render() {
    return (
        <ChatBox
          list={this.state.list}
          height={500}
          rowHeight={this._rowHeight}
          rowRenderer={this._rowRenderer}
          loadMoreRows={this._loadMoreRows}
          getListComponent={this._getListComponent}
        />
    )
  }




```

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| loadMoreRows | Function | ✓ | Callback used for loading more data |
| rowRenderer | Function | ✓ | Used to render each row |
| rowHeight | Number or Function | ✓ | Either a fixed row height (number) or a function that returns the height of a row given its index: `({ index: number }): number` |
| threshold | Number |  | How many pixel before the bottom  to request more data (default: 50) |
| list | Array |  | Data array |
| height | Number | ✓ | Force a height on the entire list component. |
| getListComponent | Function |  | Callback used to give back reference to underlying virtualized list component for finer control |

## Development
Should you wish to develop this module further start by cloning this repository

### Run Dev - Run hot reloading node server
```
$ npm start
```

### Run Prod - Build, deploy, minify npm module
```
$ npm run build
```
## Acknowledgments
This library draws inspiration from [react-virtualized](https://github.com/bvaughn/react-virtualized)  I highly encourage you to check out [react-virtualized](https://github.com/bvaughn/react-virtualized) instead, it's a fantastic library ❤️
