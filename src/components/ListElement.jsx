import React, { Component } from 'react';
import "./ListElement.css"

class ListElement extends Component {
  
  render() {
    return (
      <div>
        <div className="list-container">
          <div className="list-element" style={{height: `${(this.props.i / this.props.n) * 100}%`}} />
        </div>
        <div className="list-element-label">{this.props.i}</div>
      </div>


    );
  }
}

export default ListElement;
