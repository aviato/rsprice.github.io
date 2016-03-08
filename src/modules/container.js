module.exports = {
  create: function () {
    if (!document.getElementById('container')) {
      let body      = document.body;
      let container = document.createElement('div');
      container.setAttribute('id', 'container');
      body.appendChild(container);
      return container;
    } else {
      container = document.getElementById('container');
      return container;
    }
  }
};
