import React, { Component } from 'react';
import Visualizer from './components/Visualizer';
import brace from 'brace';
import AceEditor from 'react-ace';
import Generator from './lib/generator';

import 'brace/mode/java';
import 'brace/theme/tomorrow';

import {arrayShuffle, ALGO_LIST_REVERSE, ALGO_BUBBLE_SORT, ALGO_QUICK_SORT, ALGO_SELECTION_SORT, DEFAULT_CODE} from "./lib/utils";

import './App.scss';

import 'react-rangeslider/lib/index.css';

// materialize
import {Footer, Button, Icon, Navbar, NavItem, Toast, Dropdown} from 'react-materialize';
import ListConfig from './components/ListConfig';

var arr = [1,2,3,4,5,6,7,8,9,10];
arrayShuffle(arr);

const INITIAL_LIST = arr;
const FUNCTION_NAME = "visualizer";
const REPO_NAME = "Algo-Vis"

// Default code added into the code mirror plugin

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
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 4,
    };

    var aceEditor = (
      <AceEditor
        className="ace-code-editor" 
        mode="javascript"
        theme="tomorrow"
        name="Code Editor"
        onLoad={this.onLoad}
        onChange={(event) => {this.setState({value:event})}}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={this.state.value}
        setOptions={options}/>
    );
    const { lst, curr } = this.state;

    var visualizer = (
      <div className="visualizer">
        <Visualizer list={lst[curr]} max={this.state.size}/>
        <div className="range-field algo-slider">
          <input type="range" min={0} max={lst.length - 1} value={curr} oninput="showVal(this.value)" onChange={(event) => {this.setState({curr: event.target.value})}}/>
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

        <div className="section code-editor" id="section-code-editor">
          <div className="instructions">
            <h4>Enter code and run the visualizer</h4>
          </div>
          <Dropdown trigger={
              <Button className="btn-large blue">Test Algorithms<Icon right>arrow_drop_down</Icon></Button>
            }>
            <NavItem onClick={() => {this.setState({value:ALGO_LIST_REVERSE})}}>List reverse</NavItem>
            <NavItem onClick={() => {this.setState({value:ALGO_BUBBLE_SORT})}}>Bubble Sort</NavItem>
            <NavItem onClick={() => {this.setState({value:ALGO_SELECTION_SORT})}}>Selection Sort</NavItem>
            <NavItem onClick={() => {this.setState({value:ALGO_QUICK_SORT})}}>Quick Sort</NavItem>
          </Dropdown>
          {aceEditor}
          <Button className="run-button btn-large blue" waves='light' onClick={this.evaluateCode}>Run Code</Button>
        </div>
      </div>
    );

    return (
      <div className="section-container">
        <Navbar brand={REPO_NAME} className='header blue-grey darken-4' right />
        {this.state.visActive ? visualizer: sections}
        <Footer className="footer blue-grey darken-4" copyrights="© Copyright 2018 StuffWeDeserve"
        links={
          <ul>
            <li><a className="grey-text text-lighten-3" href="http://kdecosta.com">Kalindu De Costa</a></li>
            <li><a className="grey-text text-lighten-3" href="https://sakshaat.github.io/">Sakshaat Choyikandi</a></li>
          </ul>
        }>

          <h5 className="white-text">Stuff We Deserve</h5>
          <p className="grey-text text-lighten-4">
            You can use rows and columns here to organize your footer content.
          </p>
        </Footer>
      </div>

    );
  }
}

export default App;
