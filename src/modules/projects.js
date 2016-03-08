import React from 'react';
import projectData from './projectData';

/*
  @param {array} team as an Array of strings
  @return {array} team as an Array of <li> elements
*/
let teamAsList = teamData => {
  return teamData.map(member => {return (<li>{member}</li>)});
};

/*
  @param  {array} data from projectData
  @return {array} array of HTML project templates
*/
let formatProjects = projectData => {
  return projectData.map(project => {
    return (
      <div>
        <h3>{project.name}</h3>
        <ul>
          {teamAsList(project.team)}
        </ul>
        <p>{project.summary}</p>
        <p>{project.technologies}</p>
      </div>
    );
  });
};


export class Projects extends React.Component {
  render() {
    const teamProjects = formatProjects(projectData.teamProjects);
    const soloProjects = formatProjects(projectData.soloProjects);
    return (
      <section>
        {teamProjects}
        {soloProjects}
      </section>
    );
  }
};
