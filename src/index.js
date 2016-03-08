// index.js
require('./index.html');
require('./stylesheets/main.scss');

// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

var Please = require('pleasejs');

let technicalSkills = {
  "strong": [
    'JavaScript',
    'jQuery',
    'HTML5',
    'CSS3',
    'Bootstrap',
    'Node.js',
    'Express.js',
    'Angular.js'
  ],
  "experienced": [
    'React.js',
    'MySQL',
    'MongoDB',
    'SASS',
    'Mocha.js',
    'Grunt.js',
    'NPM',
    'Agile',
    'CoffeeScript',
    'ES6',
    'Webpack'
  ]
}

let hobbies = {
  "videoGames": ['Starcraft', 'Diablo', 'Warcraft', 'Counter Strike', 'Portal', 'DOTA'],
  "physActivities": ['Soccer', 'Hiking', 'Fishing', 'Running'],
  "playsDrums": true
}

class Developer {
  constructor(name, age, location, hasCoffee, skills, hobbies) {
    this.name      = name
    this.age       = age
    this.location  = location
    this.hasCoffee = hasCoffee
    this.skills    = skills
    this.hobbies   = hobbies
  }
  getCoffee() {
    if (this.hasCoffee) {
      return 'No such thing as too much coffee!'
    }
    console.log('Woooo! More Coffee!')
    return this.hasCoffee = true
  }
  code() {
    let strong = this.skills.strong[Math.floor(Math.random()*this.skills.strong.length)]
    let exp    = this.skills.experienced[Math.floor(Math.random()*this.skills.experienced.length)]
    if (this.hasCoffee) {
      console.log(`It's time to code some ${strong} and learn more about ${exp}!`)
    } else {
      this.getCoffee()
    }
  }
}

let ryan = new Developer('Ryan', 25, 'Portland, OR', true, technicalSkills, hobbies)

let projects = [
  {
    "name": 'Knowhere',
    "team": ['Brian N.', 'Zach S.', 'Max G.', 'Ryan P.'],
    "summary": `Web application that provides groups and individuals
     with information to help organize an upcoming trip`,
     "technologies": ['MongoDB', 'Express.js', 'Angular.js', 'Node.js', 'Grunt.js']
  },
  {
    "name": 'Samuraicipes',
    "team": ['Eric H.', 'Casey W.', 'Aaron P.', 'Ryan P.'],
    "summary": `Web Application that provides recipes and nutritional
     data to help consumers build a shopping list`,
     "technologies": ['MongoDB', 'Express.js', 'Angular.js', 'Node.js', 'Grunt.js']
  },
  {
    "name": 'Should I Watch This',
    "team": ['Eric H.', 'Casey W.', 'Aaron P.', 'Ryan P.'],
    "summary": `Web application that visualizes TV show IMDB ratings to help
     consumers invest their time into quality programs`,
     "technologies": ['MongoDB', 'Express.js', 'Angular.js', 'Node.js', 'Grunt.js']
  },
  {
    "name": 'The Depths of Winter',
    "team": ['Matt L.', 'Nick K.', 'Ryan P.'],
    "summary": `Winter-survival simulation game produced for the Bacon Game Jam,
     a 48 hour online hackathon `,
     "technologies": ['HTML5', 'HTML5 Canvas', 'CSS3', 'JavaScript']
  }
]

let contact = [
  {
    "platform": 'Github',
    "username": 'rsprice',
    "url": 'https://github.com/rsprice'
  },
  {
    "platform": 'Twitter',
    "username": '@imryanprice',
    "url": 'https://twitter.com/imryanprice'
  },
  {
    "platform": 'LinkedIn',
    "url": 'https://www.linkedin.com/in/rsprice',
  }
]
