import React, { Component } from 'react';
import './App.css';
import Visualizer from './components/Visualizer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentList :[3, 4, 5, 6, 7, 8, 9, 2, 4, 6]
    }

    this.rotateList = this.rotateList.bind(this);
  }

  rotateList() {
    var lst = this.state.currentList;
    var finalLst = lst.slice(1)
    finalLst.push(lst[0]);
    this.setState({currentList: finalLst})
  }

  render() {
    return (
      <div className="App">
        <Visualizer list={this.state.currentList}/>
        <button onClick={this.rotateList}>Next</button>
      </div>
    );
  }
}

export default App;
