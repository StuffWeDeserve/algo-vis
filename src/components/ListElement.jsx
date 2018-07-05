import React, { Component } from 'react';
import "./ListElement.css"

class ListElement extends Component {
  render() {
    return (
      <div className="element" style={{height: `${this.props.n * this.props.i}%`}}>
          
      </div>
    );
  }
}

export default ListElement;
