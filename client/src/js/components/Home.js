import React, { Component } from 'react';
import Chat from './Chat';

export default class Home extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Chat/>
      </div>
    );
  }
}
