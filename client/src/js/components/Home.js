import React, { Component } from 'react';
import Chat from './Chat';
import {Panel} from 'react-bootstrap';

export default class Home extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Panel>
          <Chat/>
        </Panel>
      </div>
    );
  }
}
