import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      <li key={this.props.key}>{this.props.text}</li>
    );
  }
}
