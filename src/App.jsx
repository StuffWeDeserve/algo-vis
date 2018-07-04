import React, { Component } from 'react';
import Visualizer from './components/Visualizer';
import CodeMirror from 'react-codemirror';

import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

// Default code added into the code mirror plugin
const DEFAULT_CODE = "function visualizer(lst) \n{\n // "
  + "Start typing here, do not delete the function declaration \n}"

// list of lists used for testing
var lstOflsts = [
  [3, 4, 5, 6, 7, 8, 9, 2, 4, 6],
  [3, 4, 5, 6, 7, 8, 2, 9, 4, 6],
  [3, 4, 5, 6, 7, 2, 8, 9, 4, 6],
  [3, 4, 5, 6, 2, 7, 8, 9, 4, 6],
  [3, 4, 5, 2, 6, 7, 8, 9, 4, 6]
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      lst : lstOflsts,
      curr : 0
    }

    this.getNextItem = this.getNextItem.bind(this);
  }

  getNextItem() {
    if(this.state.curr + 1 >= this.state.lst.length) {
      this.setState({curr: 0});
    } else {
      this.setState({curr: this.state.curr + 1});
    }
  }

  render() {
    // the parameters for the codemirror
    var options = {
      lineNumbers: true,
      mode: 'javascript'
    };
    
    return (
      <div className="App">
        <Visualizer list={this.state.lst[this.state.curr]}/>
        <button onClick={this.getNextItem}>Run</button>
        <CodeMirror defaultValue={DEFAULT_CODE} options={options}/>
      </div>
    );
  }
}

export default App;
