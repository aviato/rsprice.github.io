import React from 'react';

let SocialMediaItem = React.createClass({
  render: function () {
    return (
      <li><a href={this.props.url}>{this.props.name}</a></li>
    );
  }
});

let SocialMediaList = React.createClass({
  render: function () {
    let socialItems = function (data) {
      let items = [];
      for (var key in data) {
        items.push(<SocialMediaItem name={key} url={data[key]}/>);
      }
      return items;
    };
    return (
      <ul>{socialItems(this.props.data.socialMediaLinks)}</ul>
    );
  }
})

export class Contact extends React.Component {
  render() {
    return (
      <section className="grid-2 center">
        <h1>Contact</h1>
        <SocialMediaList data={this.props.data}/>
      </section>
    );
  }
};
