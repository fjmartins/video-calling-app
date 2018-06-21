import React, { Component } from 'react';

import { Link } from 'react-router';

import '../../App.css';

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Video Conference App</Link>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
