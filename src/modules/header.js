import React from 'react';

export class Header extends React.Component {
  render() {
    return (
      <header className="layout-header">
        <h1>Ryan Price</h1>
        <nav className="nav-links">
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Resume</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
};
