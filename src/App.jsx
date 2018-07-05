import React, { Component } from 'react';
import Visualizer from './components/Visualizer';
import CodeMirror from 'react-codemirror';
import Generator from './lib/generator'

import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

// Default code added into the code mirror plugin
const DEFAULT_CODE = "function visualizer(lst) \n{\n // "
  + "Start typing here, do not delete the function declaration \n}";
const INITIAL_LIST = [[1,2,3,4]];

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
      lst : INITIAL_LIST,
      curr : 0,
      value: DEFAULT_CODE
    }

    this.evaluateCode = this.evaluateCode.bind(this);
    this.getNextItem = this.getNextItem.bind(this);
  }

  evaluateCode() {
    this.setState({lst: Generator.generateNList(INITIAL_LIST[0], this.state.value, "visualizer")});
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
        <button onClick={this.evaluateCode}>Run</button>
        <button onClick={this.getNextItem}>Next</button>
        <CodeMirror ref="codeEditor" defaultValue={DEFAULT_CODE} options={options} onChange={(event)=> {this.setState({value:event});}}/>
      </div>
    );
  }
}

export default App;
