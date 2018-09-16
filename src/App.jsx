import React, { Component } from 'react';
import Visualizer from './components/Visualizer';
import brace from 'brace';
import AceEditor from 'react-ace';
import Generator from './lib/generator';

import 'brace/mode/java';
import 'brace/theme/tomorrow';


import './App.scss';
import 'react-rangeslider/lib/index.css';

// util functions
import {generateNumList, arrayShuffle} from "./lib/utils";

// Algorithms
import {FUNCTION_NAME, ALGO_LIST_REVERSE, ALGO_BUBBLE_SORT, ALGO_QUICK_SORT, 
  ALGO_SELECTION_SORT, DEFAULT_CODE} from "./lib/algorithms"

// materialize
import {Footer, Button, Icon, Navbar, NavItem, Toast, Dropdown} from 'react-materialize';
import ListConfig from './components/ListConfig';

let LIST_SIZE = 100;
const REPO_NAME = "AlgoVis"

var initial_arr = generateNumList(LIST_SIZE);

// Default code added into the code mirror plugin

class App extends Component {
  constructor() {
    super();
    this.state = {
      lst : [initial_arr],
      curr : 0,
      value: DEFAULT_CODE,
      size : initial_arr.length,
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
      tabSize: 4
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
        wrapEnabled={true}
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
            <h4>Enter code and run the visualizer. </h4>
            <h5><i>Note: Assignments to the lst variable do not currently work.</i></h5>
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
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">{REPO_NAME}</a>
          </div>
        </nav>
        {this.state.visActive ? visualizer: sections}
        <Footer className="footer blue-grey darken-4" copyrights="© Copyright 2018 StuffWeDeserve"
          links={
            <ul>
              <li><a className="grey-text text-lighten-3" href="http://kdecosta.com"><i class="fab fa-github"></i> Kalindu De Costa</a></li>
              <li><a className="grey-text text-lighten-3" href="https://sakshaat.github.io/"><i class="fab fa-github"></i> Sakshaat Choyikandi</a></li>
            </ul>}>
          <h5 className="white-text">List Visualizer</h5>
          <p className="grey-text text-lighten-4">
            Visualize any algorithm that manipulates a list. 
            This visualizer DOES NOT compute complexity,
             each step in the visualizer represents a list 
             manipulation that occured in the main list.
          </p>
        </Footer>
      </div>

    );
  }  
}

export default App;
