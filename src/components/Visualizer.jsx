import React, { Component } from 'react';
import "./Visualizer.css"
import ListElement from './ListElement';
import shortid from 'shortid';

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max : this.props.max
    }
  }

  componentWillReceiveProps(nextProps) {
    let newMax = this.props.max;
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (newMax !== this.state.max) {
      this.setState({ max: newMax });
    }
  }

  render() {

    const { max } = this.state;

    return (
      // this is not the right this
      <div className="vis">
        {this.props.list.map((elem, i) => <ListElement key={shortid.generate()} i={elem} n={max}/>)} 
      </div>
    );
  }
}

export default Visualizer;
