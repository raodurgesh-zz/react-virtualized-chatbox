
import React ,{Component} from 'react';


export default class InputBox extends Component{
  constructor(props){
    super(props);
    this.state = {value:''}

      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
  }

   handleChange(e) {
      this.setState({ value: e.target.value });
   }

   keyPress(e){
      if(e.keyCode == 13){
        this.props.onEnter(e.target.value);
        this.setState({ value: '' });
      }
   }

  render(){
    return(
     <input placeholder ="use me..." value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} style ={{'height': '30px','width': '100%',boxSizing: 'border-box','border': '2px solid'}} />
    )
  
  }


}