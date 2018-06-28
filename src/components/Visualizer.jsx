import React, { Component } from 'react';
import "./Visualizer.css"
import ListElement from './ListElement';

class Visualizer extends Component {
  render() {
    return (
      <div className="vis">
        {this.props.list.map(function (elem, i) {
            return <ListElement key={i} i={elem} n={10}/>
        })}
      </div>
    );
  }
}

export default Visualizer;
