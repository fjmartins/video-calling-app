import React, { Component } from 'react';

export default class Me extends Component {
  render() {
    return (
      <div className="Me">
        <li>{props.name}(you)</li>  
      </div>
    );
  }
}
