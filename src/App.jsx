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
      value: DEFAULT_CODE,
      size : INITIAL_LIST.length
    }

    this.evaluateCode = this.evaluateCode.bind(this);
    this.updateListSize = this.updateListSize.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.listRandomizer = this.listRandomizer.bind(this);
  }

  listRandomizer() {
    this.setState((prevState) => {
      let temp = prevState.lst[0];
      arrayShuffle(temp); 
      return {curr : 0, lst : [temp]}
    });
  }

  handleSizeChange(event) {
    this.setState({size: parseInt(event.target.value, 10)})
  }

  evaluateCode() {
    this.setState((prevState) => 
      {return {curr: 0, lst: Generator.generateNList(prevState.lst[0], prevState.value, FUNCTION_NAME)}});
  }

  updateListSize() {
    var lst = [...Array(this.state.size + 1).keys()].slice(1);
    this.setState({lst:[lst], curr:0});
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
        <span>
        <label>
            List Elements:
            <input type="number" id="height" name="height" min="0" max="100" value={this.state.size} placeholder="10" onChange={this.handleSizeChange} />
          </label>
          <button onClick={this.updateListSize}>Run</button>
          <button onClick={this.listRandomizer}>Randomizer</button>
        </span>
        
        <Visualizer list={lst[curr]} max={this.state.size}/>

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
