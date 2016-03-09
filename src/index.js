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
import {Contact} from './modules/contact';
import {Resume} from './modules/resume';
import projectData from './modules/projectData';

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
          <Projects data={this.props.data} />
          <Contact data={this.props.data} />
          <Resume />
          <Footer />
        </div>
      );
    }
  });

  ReactDOM.render(<PortfolioApp data={projectData}/>, container.create());

})();
