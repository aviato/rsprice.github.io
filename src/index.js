// index.js
require('./index.html')
// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./styles.css') // The page is now styled
var Please = require('pleasejs')

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
