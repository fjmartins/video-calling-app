import React, { Component } from 'react';
import Nav from './Nav';

export default class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <Nav />
        <main className="Main">
          {this.props.children}
        </main>
      </div>
    );
  }
}
