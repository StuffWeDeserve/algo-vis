import React, { Component } from 'react';
import "./ListConfig.scss"
import shortid from 'shortid';
import {Button, Card} from 'react-materialize';

class ListConfig extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
        <Card className="appConfig white">
          <section className="content">
            <label>
              List Elements:
              <input type="number" id="height" name="height" min="0" value={this.props.size} placeholder="10" onChange={this.props.handleSizeChange} />
            </label>
            <div className="btnContainer">
              <Button className="blue" waves='light' onClick={this.props.updateListSize}>
                Load
              </Button>
              <Button className="blue" waves='light' onClick={this.props.listRandomizer}>
                Randomize
              </Button>
            </div>
            <section className="list-view">
              
              <div className="listValues">
                [{ this.props.lst[0].map((elem) => <span className="listValuesItem" key={shortid.generate()}>{elem}</span>)}]
              </div>  
            </section>
          </section>
        </Card>
    );
  }
}

export default ListConfig;
