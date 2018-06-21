import React, { Component } from 'react';

export default class Friend extends Component {
  render() {
    return (
      <div className="Friend">
        <div className="col-sm-3" key={this.props.index}>
          <div className="panel panel-primary">
            <div className="panel-heading">

            </div>
          </div>
        </div>
      </div>
    );
  }
}
