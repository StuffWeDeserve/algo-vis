import React, { Component } from 'react';
import Visualizer from './components/Visualizer';
import CodeMirror from 'react-codemirror';
import Generator from './lib/generator'

import arrayShuffle from "./lib/utils"

import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

// slider
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'


var arr = [1,2,3,4,5,6,7,8,9,10];
arrayShuffle(arr);

const INITIAL_LIST = arr;

const FUNCTION_NAME = "visualizer";

// Default code added into the code mirror plugin
const DEFAULT_CODE = `function ${FUNCTION_NAME}(lst) \n{\n  //`
  + "Start typing here, do not delete the function declaration \n}";

class App extends Component {
  constructor() {
    super();
    this.state = {
      lst : [INITIAL_LIST],
      curr : 0,
      value: DEFAULT_CODE
    }

    this.evaluateCode = this.evaluateCode.bind(this);

  }

  evaluateCode() {
    this.setState((prevState) => 
      {return {curr: 0, lst: Generator.generateNList(INITIAL_LIST, prevState.value, FUNCTION_NAME)}});
  }

  render() {
    // the parameters for the codemirror
    var options = {
      lineNumbers: true,
      mode: 'javascript'
    };

    const { lst, curr } = this.state
    
    return (
      <div className="App">
        <Visualizer list={lst[curr]}/>

        <button onClick={this.evaluateCode}>Run</button>

        <Slider
          className="slider"
          min={0}
          max={lst.length - 1}
          value={curr}
          onChange={(value) => {this.setState({curr: value})}}
        /> 

        <CodeMirror defaultValue={DEFAULT_CODE} options={options} 
          onChange={(event) => {this.setState({value:event})}}
        />
      </div>
    );
  }
}

export default App;
