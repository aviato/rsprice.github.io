require('./index.html');
require('./stylesheets/main.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import Please from 'pleasejs';
import container from './modules/container';
import {Header} from './modules/header';
import {Footer} from './modules/footer';
import {About} from './modules/about';
import {Projects} from './modules/projects';

// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

(function () {

  var PortfolioApp = React.createClass({
    render: function () {
      return (
        <div>
          <Header />
          <About />
          <Projects />
          <Footer />
        </div>
      );
    }
  });

  ReactDOM.render(<PortfolioApp />, container.create());

})();
