import React, { Component } from 'react';
import "./Visualizer.css"
import ListElement from './ListElement';
import shortid from 'shortid';

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max : Math.max(...this.props.list)
    }
  }

  componentWillReceiveProps(nextProps) {
    let newMax = Math.max(...nextProps.list);
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
