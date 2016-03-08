import React from 'react';

/*
  @param {array} team as an Array of strings
  @return {array} team as an Array of <li> elements
*/
let teamAsList = teamData => {
  let id = 0;
  return teamData.map(member => {
    return (
      <li key={id++}>{member}</li>
    )
  });
};

let SoloProject = React.createClass({
  render: function () {
    return (
      <div>
        <h3>{this.props.data.name}</h3>
        <p>{this.props.data.summary}</p>
      </div>
    );
  }
})

let TeamProject = React.createClass({
  render: function () {
    return (
      <div>
        <h3>{this.props.data.name}</h3>
        <ul>{teamAsList(this.props.data.team)}</ul>
        <p>{this.props.data.summary}</p>
        <p>{teamAsList(this.props.data.technologies)}</p>
      </div>
    );
  }
})


export class Projects extends React.Component {
  render() {
    let propData = this.props.data;
    let teamProjects = function () {
      let id = 0;
      return propData.teamProjects.map(project => {
        return (
          <TeamProject key={id++} data={project} />
        );
      });
    };
    let soloProjects = function () {
      let id = 0;
      return propData.soloProjects.map(project => {
        return (
          <SoloProject key={id++} data={project} />
        );
      });
    };
    return (
      <section className="grid-2 center">
        <h2>Team Projects</h2>
        <ul>{teamProjects()}</ul>
        <h2>Solo Projects</h2>
        <ul>{soloProjects()}</ul>
      </section>
    );
  }
};
