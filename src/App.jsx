import React, { Component } from 'react';
import Visualizer from './components/Visualizer';
import CodeMirror from 'react-codemirror';
import Generator from './lib/generator';

import arrayShuffle from "./lib/utils";

import './App.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import 'react-rangeslider/lib/index.css';

// materialize
import {Footer, Button, Icon, Navbar, NavItem, Toast} from 'react-materialize';
import ListConfig from './components/ListConfig';

var arr = [1,2,3,4,5,6,7,8,9,10];
arrayShuffle(arr);

const INITIAL_LIST = arr;
const FUNCTION_NAME = "visualizer";
const REPO_NAME = "Algo-Vis"

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
    this.hideVis = this.hideVis.bind(this);
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
    var genList =[this.state.lst[0]];
    try {
      genList = Generator.generateNList(this.state.lst[0], this.state.value, FUNCTION_NAME);
      this.setState((prevState) => 
      {return {curr: 0, lst: genList, visActive: true}});
    }
    catch (err) {
      window.Materialize.toast('The code does not compile: ' + err, 3000);
    }
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
      viewportMargin:20,
      height: '70%'
    };

    var codeMirror = (<CodeMirror className="code-mirror" style={{"height":"300px"}} defaultValue={DEFAULT_CODE} options={options} 
    onChange={(event) => {this.setState({value:event})}} />);

    const { lst, curr } = this.state

    var visualizer = (
      <div className="visualizer">
        <Visualizer list={lst[curr]} max={this.state.size}/>
        <div className="range-field slider">
          <input type="range" min={0} max={lst.length - 1} value={curr} onChange={(event) => {this.setState({curr: event.target.value})}}/>
        </div>
        <Button className="blue darken-5" waves='light' onClick={this.hideVis}>
          Close
        </Button>
      </div>);

    var sections = (
      <div className="App">
        <div className="section main-app">
            <div className="instructions">
                <h4>Configure the list size and randomize the list elements</h4>
            </div>
            <ListConfig 
              size={this.state.size} 
              handleSizeChange={this.handleSizeChange} 
              updateListSize={this.updateListSize}
              lst={this.state.lst}
              listRandomizer={this.listRandomizer} />
        </div>

        <div className="section code-editor">
          <div className="instructions">
            <h4>Enter code and run the visualizer</h4>
          </div>
          {codeMirror}
          <Button className="run-button btn-large blue" waves='light' onClick={this.evaluateCode}>Run Code</Button>
        </div>
      </div>
    );

    return (
      <div className="section-container">
        <Navbar brand={REPO_NAME} className='header blue-grey darken-4' right />
        {this.state.visActive ? visualizer: sections}
        <Footer className="footer blue-grey darken-4" copyrights="© Copyright 2018 StuffWeDeserve"> </Footer>
      </div>

    );
  }
}

export default App;
