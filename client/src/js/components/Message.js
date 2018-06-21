import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      <li>{this.props.text}</li>
    );
  }
}
