import React, { Component } from 'react';
import Visualizer from './components/Visualizer';
import CodeMirror from 'react-codemirror';
import Generator from './lib/generator';
import shortid from 'shortid';

import arrayShuffle from "./lib/utils";

import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

// slider
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

// materialize
import {Button, Icon, Card, Collection, CollectionItem} from 'react-materialize';

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
      size : INITIAL_LIST.length,
      visActive: false
    }

    this.evaluateCode = this.evaluateCode.bind(this);
    this.updateListSize = this.updateListSize.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.listRandomizer = this.listRandomizer.bind(this);
    this.hideVis = this.hideVis.bind(this);
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
      {return {curr: 0, lst: Generator.generateNList(prevState.lst[0], prevState.value, FUNCTION_NAME), visActive: true}});
  }

  updateListSize() {
    var lst = [...Array(this.state.size + 1).keys()].slice(1);
    this.setState({lst:[lst], curr:0});
  }

  hideVis() {
    this.setState({visActive:false});
  }

  render() {
    // the parameters for the codemirror
    var options = {
      lineNumbers: true,
      mode: 'javascript',
      style: {"height":"80%"}
    };

    const { lst, curr } = this.state

    var visualizer = (
      <div className="visualizer">
        <Visualizer list={lst[curr]} max={this.state.size}/>

        {/* <Slider
          className="slider"
          min={0}
          max={lst.length - 1}
          value={curr}
          onChange={(value) => {this.setState({curr: value})}}
        />  */}
        <div className="range-field slider">
          <input type="range" min={0} max={lst.length - 1} value={curr} onChange={(event) => {this.setState({curr: event.target.value})}}/>
        </div>
        <Button className="blue darken-5" waves='light' onClick={this.hideVis}>
          Close
        </Button>
      </div>
    );
    
    return (
      <div className="App">
        <Card className="appConfig white">
          <label>
            List Elements:
            <input type="number" id="height" name="height" min="0" max="100" value={this.state.size} placeholder="10" onChange={this.handleSizeChange} />
          </label>
          {/* <button onClick={this.updateListSize}>Run</button>
          <button onClick={this.listRandomizer}>Randomizer</button> */}
          <div className="btnContainer">
            <Button className="blue darken-5" waves='light' onClick={this.updateListSize}>
              Load
            </Button>
            <Button className="blue darken-5" waves='light' onClick={this.listRandomizer}>
              Randomize
            </Button>
          </div>
          
          <div className="listValues">[{lst[0].map((elem) => <span className="listValuesItem" key={shortid.generate()}>{elem}</span>)}]</div>        
        </Card>
        
        <CodeMirror defaultValue={DEFAULT_CODE} options={options} 
          onChange={(event) => {this.setState({value:event})}}
          className="codeEditor"
        />

        <Button className="blue darken-5" waves='light' onClick={this.evaluateCode}>
          Run
        </Button>
        {this.state.visActive ? visualizer: null}

        <div className="sideBarContainer">
            <div className="sideBar">
                <div className="appConfigInfo">
                  <div className="infoItem">
                    Configure the list size and randomize the list elements
                  </div>
                </div>
                <div className="codeEditorInfo">
                  <div className="infoItem">
                    Perform some list manipulations
                  </div>
                </div>
                                
            </div>
        </div>
      </div>
    );
  }
}

export default App;
