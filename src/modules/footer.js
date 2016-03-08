var React = require('react');

export class Footer extends React.Component {
  render() {
    return (
      <footer className="layout-footer">
        <small>Ryan Price | 2016</small>
        <nav className="nav-links">
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Resume</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </footer>
    );
  }
};
