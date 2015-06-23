//;(function() {
  
// ------------------------------------------------------------------------------------------------

//                                             Game

// ------------------------------------------------------------------------------------------------
  
  // Game class
  var Game = function() {
    this.canvas = document.getElementById('canvas');    
    this.ctx = canvas.getContext('2d');
    this.FPS = 30;
    this.size = { x: canvas.width, y: canvas.height };
    this.day = 1;
    this.totalDays = 90;
    this.BG = new Image();
    this.BG.src = 'resources/Screens/DeskJournalandScroll.png';
    this.turnActive = false;
    this.startScreenActive = true;
    this.indicator = new Image();
    this.indicator.src = 'resources/ActionIcons/IndicatorLight.png';
    this.scroll = new Image();
    this.scroll.src = 'resources/ActionIcons/scroll.png';
    this.starvationChance = 0;
    this.freezeChance = 0;
    this.wolves = false;
    this.starvation = false;
    this.blizz = false;
    this.plague = false;
    
    // resouces object
    this.resources = {
      subjects: 300,
      logs: 27000,
      firewood: 0,
      ore: 6750,
      medicine: 0,
      grain: 27000,
      bread: 0,
      tasks: 3,
      swords: 0,
      herbs: 6750
    };
    
  }
  
  // Clear the canvas
  // THIS MAY BREAK THINGS IN THE FUTURE... THE CODE SNIPPET INSIDE THIS FUNCTION WAS ONCE IN
  // GAME.PROTOTYPE.DRAW ON LINE 22 (FIRST LINE OF THE FUNCTION)
  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  // Draw to the canvas
  Game.prototype.draw = function() {
      game.BG.onload = function() {
        game.clear();
        game.ctx.drawImage(game.BG, 0, 0);
        game.update();
        console.log('game.draw is working');
      }
    
  };
  
  // 
  Game.prototype.update = function() {
    journal.update();
    console.log('game.update is working');
  };

    
  // ------------------------------------------------------------------------------------------------

  //                                             Sounds

  // ------------------------------------------------------------------------------------------------
    
  var Sounds = function() {
    this.mainThemeMP3 = new Audio('resources/sounds/DepthsOfWinter1.mp3');
    this.mainLoopMP3 = new Audio('resources/sounds/WinterLoop.mp3');
    this.gameOverTheme = new Audio ('resources/sounds/GameOver.mp3');
    this.BShammer = new Audio('resources/sounds/Anvil.mp3');
    this.granary = new Audio('resources/sounds/Granary.mp3');
    this.LMsound = new Audio('resources/sounds/LumberMill.mp3');
    this.Apothsounds = new Audio('resources/sounds/Apothecary.mp3');
    this.pageTurn = new Audio('resources/sounds/PageTurn.mp3');
    this.wolfAttack = new Audio('resources/sounds/WolfAttack.mp3');
    this.blizzard = new Audio('resources/sounds/Blizzard.mp3');
    this.victoryTheme = new Audio('resources/sounds/VICTORY.mp3');
    this.plague = new Audio('resources/sounds/Plague.mp3');
    this.starvation = new Audio('resources/sounds/Starvation.mp3');
  }

  
  // ------------------------------------------------------------------------------------------------

  //                                           Main Menu

  // ------------------------------------------------------------------------------------------------

  /*
      Menu should have game title + instructions on how to begin the game.  
  */

  // Menu class... instantiate and draw to the game to display menu
  var MainMenu = function() {
    this.x = 200;
    this.y = 200;
    this.title = 'The Depths of Winter';
    this.enter = 'Press Enter to Begin';
    // there might have to be many broken up lines of lore.
    this.lore = 'lore lore lore lore lore lore';
    // Need to add the BG image here as a new Image()
    // need to add the BG image src here with the file path as it's property
    this.startScreen = new Image();
    this.startScreen.src = 'resources/Screens/StartScreen.png';
  };

  // Should probably be drawn when the page loads
  MainMenu.prototype.draw = function() { 
    mainMenu.startScreen.onload = function() {
      game.clear();
      game.ctx.drawImage(mainMenu.startScreen, 0 , 0);
      console.log('start image working');
    }
      

  };

  
  // Name character and name castle should probably have their own screen as well
  
  // -----------------------------------------------------------------------------------------------

  //                                           Game Over

  // ------------------------------------------------------------------------------------------------
  
  var GameOverScreen = function() {
    this.BG = new Image();
    this.BG.src = 'resources/Screens/GameOverScreen.png';
  };

  GameOverScreen.prototype.draw = function() {
    game.ctx.drawImage(gameOver.BG, 0, 0);
    sounds.gameOverTheme.play();
    console.log('gameOver.draw is working');
  };


  // -----------------------------------------------------------------------------------------------

  //                                         Victory Screen

  // ------------------------------------------------------------------------------------------------
    

  var VictoryScreen = function() {
    this.BG = new Image();
    this.BG.src = 'resources/Screens/VictoryScreenGreen.png';
  };

  VictoryScreen.prototype.draw = function() {
      game.ctx.drawImage(victory.BG, 0, 0);
      game.ctx.fillStyle = '#fff';
      game.ctx.font = '100px alagard_by_pix3m-d6awiwp';
      game.ctx.fillText('VICTORY!', 232, 140);
      sounds.victoryTheme.play();
      console.log('victory.draw is working');
  };


  // -----------------------------------------------------------------------------------------------

  //                                    Main Game Loop Functions

  // ------------------------------------------------------------------------------------------------
  
  var startScreenActive = true;

  function loopSong() {
    song.addEventListener('ended', function() {
      song.currentTime = 0;
    })
  };

  function startGame(){
    sounds.mainThemeMP3.play();
    sounds.mainThemeMP3.addEventListener('ended', function() {
      sounds.mainLoopMP3.loop = true;
      sounds.mainLoopMP3.play();
    }, false);//  DISABLE FOR DEBUGGING!
    
    mainMenu.draw();
  }; 

  function playGame() {
    game.clear();
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
  };


  // ------------------------------------------------------------------------------------------------

  //                                           Journal

  // ------------------------------------------------------------------------------------------------

  // Keep track of all the journal's things
  var Journal = function() {
    this.playerUI = new Image();
    this.playerUI.src = 'resources/DeskJournalandScroll.png';
    this.journalArray = [];
    
    // All the building objects... x & y coords + width and height of sprites + strings and methods
    this.buildings = {
      // Blacksmith object
      blacksmith: {
        label: 'Blacksmith',
        introTextLn1: 'The blacksmith can turn your',
        introTextLn2: 'ore into swords to help fend',
        introTextLn3: 'off wolf attacks. The wolves',
        introTextLn4: 'become increasingly hungry',
        introTextLn5: 'as the winter goes on.',
        currentArms: game.resources.swords,
        forgeValue: 0,
        armsStatus: 'Armed subjects: ' + game.resources.swords + '',
        oreStatus: 'Remaining ore: ' + game.resources.ore + '',
        forgeSwords: function(val) {
          game.resources.swords += val;
          game.resources.ore -= val * 10;
          // last thing I changed
          if (game.resources.ore < val) {
            val = 0;
          }
        }
      },
      
      // Granary object
      granary: {
        label: 'Granary',
        introTextLn1: 'Turn your grain into bread',
        introTextLn2: 'to feed your subjects. If',
        introTextLn3: 'your bread stores are empty',
        introTextLn4: 'you risk the chance of your',
        introTextLn5: 'subjects dying of starvation.',
        grainStatus: 'Remaining grain: ' + game.resources.grain + '',
        breadStatus: 'Total bread: ' + + game.resources.bread + '',
        granaryValue: 0,
        makeBread: function(val) {
          game.resources.bread += val;
          game.resources.grain -= val * 2;
        }
      },
      
      // Lumbermill object
      lumbermill: {
        label: 'Lumber Mill',
        introTextLn1: 'The winter cold is bitter and',
        introTextLn2: 'cruel. A well stoked fire is',
        introTextLn3: 'crucial to the survival of your',
        introTextLn4: 'people. It is the only thing',
        introTextLn5: 'that can protect your people',
        introTextLn6: 'against the nothern blizzards.',
        logsStatus: 'Remaining logs: ' + game.resources.logs + '',
        firewoodStatus: 'Total firewood: ' + + game.resources.firewood + '',
        firewoodValue: 0,
        makeFirewood: function(val) {
          game.resources.firewood += val;
          game.resources.logs -= val * 2;
        }
      },
      
      
      // Apothecary object
      apothecary: {
        label: 'Apothecary',
        introTextLn1: 'The apothecary can turn your',
        introTextLn2: 'herbs into a second chance at',
        introTextLn3: 'life. Plague can strike at any',
        introTextLn4: 'moment, so it\'s good to keep a',
        introTextLn5: 'healthy supply of medicine.',
        herbsStatus: 'Remaining herbs: ' + game.resources.herbs + '',
        medicineStatus: 'Total medicine: ' + + game.resources.medicine + '',
        medicineValue: 0,
        makeMedicine: function(val) {
          game.resources.medicine += val;
          game.resources.herbs -= val * 3;
        }
      },
      
      // Scroll Object
      scroll: {
        
        // In here we'll fill out a report with our current status
        // Using a div instead of the canvas so we'll update the elements
        writeReport: function() {
          var matsListItems = rawMats.getElementsByTagName('li');
          var consListItems = consumables.getElementsByTagName('li');
          openScroll.style.zIndex = 1000;
          openScroll.style.visibility = 'visible';
          closeScrollButton.style.zIndex = 1000;
          closeScrollButton.style.visibility = 'visible';
          
          // First day of game provides some intro text as a scroll report
          if (game.day === 1) {
            
            label.innerHTML = 'Welcome!';
            
            report.innerHTML = 'The winter lasts 90 days this year, and you must manage your resources wisely or else face the bitter cold unprepared. From the desk in your keep you will oversee the day to day operations within the castle: providing medicine to your people, forging weapons, and keeping a stocked grainery. You are responsible for the subjects of your village… that is, if they don’t all die from blizzard, sickness, and the wolves of winter.'
            rawMats.style.visibility = 'hidden';
            consumables.style.visibility = 'hidden';
            
          } else {
            
            label.innerHTML = 'Day ' + game.day + ' Report';
            
            report.innerHTML = '';
            
            // Report the appropriate disaster on the next day's scroll
            if (game.wolves === true) {
              report.innerHTML = disaster.wolfText;
              game.wolves = false;
            } else if (game.starvation === true) {
              report.innerHTML = disaster.starveText;
              game.starvation = false;
            } else if (game.plague === true) {
              report.innerHTML = disaster.plagueText;
              game.plague = false;
            } else if (game.blizz === true) {
              report.innerHTML = disaster.blizzText;
              game.blizz = false;
            } else {
              report.innerHTML = disaster.noDisasterText;
            }
            
            matsListItems[0].innerHTML = 'Ore: ' + game.resources.ore;
            matsListItems[1].innerHTML = 'Grain: ' + game.resources.grain;
            matsListItems[2].innerHTML = 'Logs: ' + game.resources.logs;
            matsListItems[3].innerHTML = 'Herbs: ' + game.resources.herbs;

            consListItems[0].innerHTML = 'Swords: ' + game.resources.swords;
            consListItems[1].innerHTML = 'Bread: ' + game.resources.bread;
            consListItems[2].innerHTML = 'Firewood: ' + game.resources.firewood;
            consListItems[3].innerHTML = 'Medicine: ' + game.resources.medicine;
            
            rawMats.style.visibility = 'visible';
            consumables.style.visibility = 'visible';
          }
          
          console.log('report written!');
          
        }
      }
    };
    
  };

  // Draw the journal (the background)
  Journal.prototype.draw = function() {
    
    game.ctx.drawImage(this.playerUI, 0, 0);
  };
  
  // Update the journal by drawing on it
  Journal.prototype.update = function() {
    
    // Set Font
    game.ctx.font = '20px alagard_by_pix3m-d6awiwp';
    
    // Blacksmith label
    game.ctx.fillText(this.buildings.blacksmith.label, 271, 235);
    
    // Granary label
    game.ctx.fillText(this.buildings.granary.label, 284, 305);
    
    // Lumbermill label
    game.ctx.fillText(this.buildings.lumbermill.label, 271, 375);
    
    // Apothecary label
    game.ctx.fillText(this.buildings.apothecary.label, 271, 455);
    
    game.ctx.font = '28px alagard_by_pix3m-d6awiwp';
    // Top left of journal day status 
    game.ctx.fillText('Day ' + String(game.day) + ' of ' + String(game.totalDays), 207, 165);
    
    game.ctx.font = '28px alagard_by_pix3m-d6awiwp';
    game.ctx.fillStyle = '#fff';
    
    // Bottom right of screen (remaining subjects)
    game.ctx.fillText('Subjects remaining: ' + game.resources.subjects, 450, 561);
    if (game.resources.tasks === 0) {
      game.ctx.fillStyle = 'red';
    }
    game.ctx.fillText('Tasks remaining: ' + game.resources.tasks, 40, 561);
    
    game.ctx.fillStyle = '#000';
    
    if (game.resources.tasks <= 0) {
      game.ctx.drawImage(game.indicator, 552, -34);
      game.ctx.fillStyle = '#fff';
      game.ctx.fillText('Click the ink well to', 286, 33);
      game.ctx.fillText('continue to the next day.', 286, 53);
      buttonArray[12].style.zIndex = 10;
      buttonArray[12].style.visibility = 'visible';
      
      game.ctx.fillStyle = '#000';
    };
    
    
  };

  
  // Deplete all resources at the start of each day.
  Journal.prototype.depleteResouces = function() {
    
    // deplete swords by a random % of amount of swords
    // if no swords roll a wolf attack
    
    // deplete bread by population
    // if no bread, roll a starvation
    game.resources.bread -= game.resources.subjects;
    if (game.resources.bread <= 0) {
      game.resources.bread = 0;
    }
    
    // deplete fw by population + a little bit extra
    // if no firewood roll a blizzard
    
    game.resources.firewood -= game.resources.subjects + Math.ceil(game.resources.subjects * .04);
    if (game.resources.firewood <= 0) {
      game.resources.firewood = 0;
    }
    
    
    // deplete medicine by a random amount (low %)
    // if no medicine roll a plague
    //game.resources.medicine -= game.resources.subjects * (game.resources.subjects * .01);
    
  };

      
  // ------------------------------------------------------------------------------------------------

  //                                         Disasters

  // ------------------------------------------------------------------------------------------------
  
  // !Disaster class... might need to be a part of the player class and subtract from Player values!
  var Disaster = function() {
    this.wolfText = '';
    this.blizzText = '';
    this.plagueText = '';
    this.starveText = '';
    this.noDisasterText = '';
  };

  Disaster.prototype.rollDisaster = function() {
    var report = document.getElementById('report');
    // should roll to see if there are any disasters
    var randRoll = Math.ceil(Math.random() * 100);
    var disasterRoll = Math.ceil(Math.random() * 4);
    var chanceToStarve = game.starvationChance;
    var chanceToFreeze = game.freezeChance;
    var wolfAttack = Math.ceil(Math.random() + 5);
    var wolfDisaster = Math.ceil(Math.random() + 10) + Math.ceil(Math.random() + 5);
    var starvation = Math.ceil((game.resources.subjects - game.resources.bread) / 10 );
    var starvationDisaster = game.resources.subjects - game.resources.bread;
    var plague = Math.ceil((Math.random() + 3));
    var plagueDisaster = Math.ceil(Math.random() + 20) + Math.ceil(Math.random() + 5);
    var blizz = Math.ceil((game.resources.subjects - game.resources.firewood) / 10);
    var blizzDisaster = Math.ceil(game.resources.subjects - game.resources.firewood);
    
    // chance for disaster will go up as each day passes
    if (randRoll + game.day > 100) {
      
      // rolling a 1 will use logic to see if there has been a starvation disaster
      if (disasterRoll === 1) {
        console.log('rolled a 1: starvation');
        
        // if you have more subjects then food: disaster is imminent
        if (game.resources.subjects > game.resources.bread) {
          // there is a set chance to starve that will increment each day that subs > food
          // add 10% chance to starve for each day
          game.starvationChance += 20;
          console.log('starvation chance: ' + game.starvationChance);
          
          // if you roll greater than 100 with a random roll and your starvation chance: disaster
          if (randRoll + game.starvationChance >= 100) {
            // Everyone who doesn't have food dies!
            sounds.starvation.play();
            game.resources.subjects -= starvationDisaster;
            disaster.starveText = 'Those who have gone without food for too long have finally perished. You lost ' + starvationDisaster + ' subjects during the night. ' + game.resources.subjects + ' remain.';
            game.starvation = true;
          } else {
            // ... Otherwise, you lose a random % of people
            sounds.starvation.play();
            game.resources.subjects -= starvation;
            disaster.starveText = 'You lost ' + starvation + ' subjects during the night to starvation. Provide them with nourishment to avoid disaster! ' + game.resources.subjects + ' remain.';
            game.starvation = true;
          }
          
        // If you have more subjects than food, no one will starve.
        } else {
          // Crisis averted... for now.
          game.starvationChance = 0;
        }
      
      // rolling a 2 will use logic to see if there has been a blizzard disaster
      } else if (disasterRoll === 2) {
        console.log('blizzard');
        
        // if you have more subjects than firewood: disaster the risk of disaster increases
        if (game.resources.subjects > game.resources.firewood) {
          // there is a chance that everyone will freeze every day you don't have firewood
          //increase the chance by 10%
          chanceToFreeze += 20;
          console.log('freezing chance:' + game.freezeChance);
          
          if (randRoll + game.freezeChance >= 100) {
            sounds.blizzard.play();
            game.resources.subjects -= blizzDisaster;
            disaster.blizzText = 'Your subjects held on for as long as they could, but they eventually succumbed to the cold. You lost ' + blizzDisaster + ' subjects during the night. ' +  game.resources.subjects + ' subjects remain.';
            game.blizz = true;
          } else {
            // lose a random % of people based on difference between subjects and firewood
            // maybe change the / 10 to / a random num
            sounds.blizzard.play();
            game.resources.subjects -= blizz;
            disaster.blizzText = 'A blizzard struck during the night and killed ' + game.resources.subjects + '. ' +  game.resources.subjects + ' subjects remain.';
            game.blizz = true;
          }
          
        } else {
          game.freezeChance = 0;
        }
      
      // Rolling a 3 will trigger a 
      } else if (disasterRoll === 3) {
        console.log('wolves');
        // If sword count is less than 25% you will not be able to fend off the wolves
        if (game.resources.swords < Math.ceil(game.resources.subjects * .25)) {
          sounds.wolfAttack.play();
          game.resources.subjects -= wolfDisaster;
          this.wolfText = 'Wolves raided during the night and you did not have enough weapons to stop them! You lost ' + wolfDisaster + ' villagers! ' + game.resources.subjects + ' subjects remain.' ;
          game.wolves = true;
        } else {
          sounds.wolfAttack.play();
          game.resources.subjects -= wolfAttack;
          this.wolfText = 'Wolves attacked during the night but you were able to hold most of them off. You lost the lives of ' + wolfAttack + ' brave villagers during the night. ' + game.resources.subjects + ' subjects remain.';
          game.wolves = true;
          console.log('WOLF ATTACK');
        }
        
      } else {
        console.log('plague');
        
        if (game.resources.medicine < Math.ceil(game.resources.subjects * .2)) {
          sounds.plague.play();
          game.resources.subjects -= plagueDisaster;
          this.plagueText = 'Without enough medicine to prevent an outbreak, plague has spread through the city during the night and killed ' + plagueDisaster + ' subjects. ' + game.resources.subjects + ' subjects remain.' ;
          game.plague = true;
          console.log('plague epidemic');
        } else {
          sounds.plague.play();
          game.resources.subjects -= plague;
          this.plagueText = 'A minor bout of plague hit the city during the night and killed ' + plague + ' subjects. Luckily you had enough medicine to fight off a full blown epidemic. ' + game.resources.subjects + '  subjects remain.';
          game.plague = true;
          console.log('died of plague');
        }
      }
    } else {
      this.noDisasterText = 'You did not lose any subjects during the night. You currently have ' + game.resources.subjects + ' subjects remaning.';
    }
    console.log(randRoll);
    console.log(disasterRoll);
  };

  // ------------------------------------------------------------------------------------------------

  //                                        Global variables

  // ------------------------------------------------------------------------------------------------
  
  // Instantiate all the objects
  var game = new Game();
  var journal = new Journal();
  var mainMenu = new MainMenu();
  var victory = new VictoryScreen();
  var gameOver = new GameOverScreen();
  var sounds = new Sounds();
  var disaster = new Disaster();
                                           
  var BS = document.getElementById('BS');
  var BSButton = document.getElementById('BSButton');
  var BSplus = document.getElementById('BSplus');
  var BSminus = document.getElementById('BSminus');
  var BScounter = 0;

  var Gran = document.getElementById('Gran');
  var GranButton = document.getElementById('GranButton');
  var Granplus = document.getElementById('Granplus');
  var Granminus = document.getElementById('Granminus');
  var GranCounter = 0;

  var LM = document.getElementById('LM');
  var LMButton = document.getElementById('LMButton');
  var LMplus = document.getElementById('LMplus');
  var LMminus = document.getElementById('LMminus');
  var LMcounter = 0;

  var Apoth = document.getElementById('Apoth');
  var ApothButton = document.getElementById('ApothButton');
  var Apothplus = document.getElementById('Apothplus');
  var Apothminus = document.getElementById('Apothminus');
  var Apothminus = document.getElementById('Apothminus');
  var Apothcounter = 0;

  var startButton = document.getElementById('startButton');
  var label = document.getElementById('label');
  
  var consumables = document.getElementById('consumables');
  var rawMats = document.getElementById('rawMats');
  var openScroll = document.getElementById('openScroll');
  var nextDayButton = document.getElementById('nextDayButton');
  var closeScrollButton = document.getElementById('closeScroll');

  var buttonArray = [];
  
  // Push all the button dom elements into a neat array
  buttonArray.push(BSButton, GranButton, LMButton, ApothButton, BSplus, BSminus, Granplus, Granminus, LMplus, LMminus, Apothplus, Apothminus, nextDayButton);
  
  // Set the game's cursor to a quill
  game.canvas.style.cursor = 'url(resources/ActionIcons/QuillCursor2.png), auto';
  
  

  // ------------------------------------------------------------------------------------------------

  //                                        Start Button

  // ------------------------------------------------------------------------------------------------

  startButton.addEventListener('click', function() {
    startButton.style.visibility = 'hidden';
    startButton.style.zIndex = -1000;
    BS.style.zIndex = 10;
    BS.style.visibility = 'visible';
    Gran.style.zIndex = 10;
    Gran.style.visibility = 'visible';
    LM.style.zIndex = 10;
    LM.style.visibility = 'visible';
    Apoth.style.zIndex = 10;
    Apoth.style.visibility = 'visible';
    playGame();
    journal.buildings.scroll.writeReport();
  });

  
  // ------------------------------------------------------------------------------------------------

  //                                        Blacksmith

  // ------------------------------------------------------------------------------------------------

  // Draw the BS page
  BS.addEventListener('click', function() {
    console.log('draw BS page');
    if (BScounter > game.resources.tasks) { journal.buildings.blacksmith.forgeValue = ((Math.ceil(game.resources.subjects / 100) * game.resources.tasks)); }
    drawBlacksmithPage();
    buttonArray.forEach(function(button) {
      button.style.visibility = 'hidden';
      button.style.zIndex = 0;
    });
    BSButton.style.visibility = 'visible';
    BSButton.style.zIndex = 10;
    BSplus.style.visibility = 'visible';
    BSminus.style.visibility = 'visible';
    BSplus.style.zIndex = 10;
    BSminus.style.zIndex = 10;

  });

  // Forge swords from ore
  BSButton.addEventListener('click', function() {
    game.resources.tasks -= BScounter;
    if (game.resources.tasks <= 0) { game.resources.tasks = 0; }
    BScounter = 0;
    console.log('this BLACKSMITH button works');
    sounds.BShammer.play();
    journal.buildings.blacksmith.forgeSwords(journal.buildings.blacksmith.forgeValue);
    journal.buildings.blacksmith.forgeValue = 0;
    drawBlacksmithPage();
  });

  // Increment forgeValue when the + button is clicked
  BSplus.addEventListener('click', function() {
    BScounter++;
    if (BScounter > game.resources.tasks) { BScounter = game.resources.tasks; }
    journal.buildings.blacksmith.forgeValue = ((Math.ceil(game.resources.subjects / 100) * BScounter));
    drawBlacksmithPage();
    console.log(BScounter);
    // console.log('BS+');
  });

  // Decrement forgeValue when the - button is clicked
  BSminus.addEventListener('click', function () {
    BScounter--;
    if (BScounter < 0) { BScounter = 0; }
    console.log('BSminus');
    journal.buildings.blacksmith.forgeValue = ((Math.ceil(game.resources.subjects / 100) * BScounter));
    drawBlacksmithPage();
    console.log(journal.buildings.blacksmith.forgeValue);
  });

  // Draw the Blacksmith page on the right side of the journal
  function drawBlacksmithPage() {
    if (game.resources.tasks < 1) {
      game.ctx.fillStyle = 'red';
      journal.buildings.blacksmith.forgeValue = 0;
      game.ctx.fillStyle = '#000';
    }
    game.ctx.drawImage(game.BG, 0, 0);
//    journal.update();
    game.update();
    
    // Label at top of page
    game.ctx.fillText(journal.buildings.blacksmith.label, 445, 165);

    // Blacksmith Intro text
    game.ctx.font = '16px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn1, 415, 204);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn2, 415, 215);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn3, 415, 226);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn4, 415, 237);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn5, 415, 248);

    // Arms and Ore status
    game.ctx.font = '20px alagard_by_pix3m-d6awiwp';
    if (game.resources.ore === 0) { game.ctx.fillStyle = 'red'; } 
    game.ctx.fillText('Remaining ore: ' + game.resources.ore, 420, 292);
    if (game.resources.swords === 0) { game.ctx.fillStyle = 'red'; }
    game.ctx.fillText('Armed subjects: ' + game.resources.swords, 420, 312);

    game.ctx.fillStyle = '#000';
    // turn the forge value into a string so that it can be printed to the page
    journal.buildings.blacksmith.forgeValue.toString();

    // Forge swords text
    game.ctx.font = '22px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText('Forge', 415, 375);
    game.ctx.beginPath();
    game.ctx.moveTo(478, 375);
    game.ctx.lineTo(500, 375);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.blacksmith.forgeValue, 484, 372);
    game.ctx.fillText('swords', 504, 375);

  };

  // ------------------------------------------------------------------------------------------------

  //                                        Granary

  // ------------------------------------------------------------------------------------------------

  // Draw the granary page
  Gran.addEventListener('click', function() {
    console.log('draw Gran page');
    buttonArray.forEach(function(button) {
      button.style.visibility = 'hidden';
      button.style.zIndex = 0;
    });
    if (GranCounter > game.resources.tasks) { journal.buildings.granary.granaryValue = game.resources.subjects * game.resources.tasks; }
    drawGranaryPage();
    GranButton.style.visibility = 'visible';
    GranButton.style.zIndex = 10;
    Granplus.style.visibility = 'visible';
    Granminus.style.visibility = 'visible';
    Granplus.style.zIndex = 10;
    Granminus.style.zIndex = 10;
  });
  
  // Bake Bread
  GranButton.addEventListener('click', function() {
    game.resources.tasks -= GranCounter;
    if (game.resources.tasks <= 0) { game.resources.tasks = 0; }
    GranCounter = 0;
    sounds.granary.play();
    console.log('this GRANARY button works');
    journal.buildings.granary.makeBread(journal.buildings.granary.granaryValue);
    journal.buildings.granary.granaryValue = 0;
    drawGranaryPage();
  });

  // Increment the bake bread value
  Granplus.addEventListener('click', function() {
    GranCounter++;
    if (GranCounter > game.resources.tasks) { GranCounter = game.resources.tasks; }
    journal.buildings.granary.granaryValue = game.resources.subjects * GranCounter;
    drawGranaryPage();
    console.log('GR+');
  });
  
  // Decrement the bake bread value
  Granminus.addEventListener('click', function () {
    GranCounter--;
    if (GranCounter < 0) { GranCounter = 0; }
    console.log('GRminus');
    journal.buildings.granary.granaryValue = game.resources.subjects * GranCounter;
    drawGranaryPage();
  });

  // Draw the Granary page on the right side of the journal
  function drawGranaryPage() {
    if (game.resources.tasks < 1) {
      game.ctx.fillStyle = 'red';
      journal.buildings.granary.granaryValue = 0;
      game.ctx.fillStyle = '#000';
    }
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
    
    // Granary label
    game.ctx.fillText(journal.buildings.granary.label, 465, 165);
    
    // Granary Intro text
    // Needs to be change to journal.buildings.granary.introTextLnX once it is written
    game.ctx.font = '16px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText(journal.buildings.granary.introTextLn1, 419, 204);
    game.ctx.fillText(journal.buildings.granary.introTextLn2, 419, 215);
    game.ctx.fillText(journal.buildings.granary.introTextLn3, 419, 226);
    game.ctx.fillText(journal.buildings.granary.introTextLn4, 419, 237);
    game.ctx.fillText(journal.buildings.granary.introTextLn5, 419, 248);
    
    // Logs and FW status
    game.ctx.font = '20px alagard_by_pix3m-d6awiwp';
    if (game.resources.grain === 0) {
      game.ctx.fillStyle = 'red';
    }
    game.ctx.fillText('Remaining grain: ' + game.resources.grain, 415, 292);
    if (game.resources.bread === 0) { game.ctx.fillStyle = 'red'; } 
    game.ctx.fillText('Total bread: ' + game.resources.bread, 415, 312);
    
    // change text color back to black
    game.ctx.fillStyle = '#000';
    
    // Make bread text
    game.ctx.font = '22px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText('Bake', 415, 375);
    game.ctx.beginPath();
    game.ctx.moveTo(475, 375);
    game.ctx.lineTo(497, 375);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.granary.granaryValue, 475, 372);
    game.ctx.fillText('bread', 510, 375);

  };


  // ------------------------------------------------------------------------------------------------

  //                                      Lumber Mill

  // ------------------------------------------------------------------------------------------------  

  // Draw the Lumber Mill page
  LM.addEventListener('click', function() {
    console.log('draw LM page');
    buttonArray.forEach(function(button) {
      button.style.visibility = 'hidden';
      button.style.zIndex = 0;
    });
    if (LMcounter > game.resources.tasks) { journal.buildings.lumbermill.firewoodValue = game.resources.subjects * game.resources.tasks; }
    drawLumbermillPage();
    LMButton.style.visibility = 'visible';
    LMButton.style.zIndex = '60';
    LMplus.style.visibility = 'visible';
    LMminus.style.visibility = 'visible';
    LMplus.style.zIndex = 10;
    LMminus.style.zIndex = 10;
  });

  // Make fire wood
  LMButton.addEventListener('click', function() {
    game.resources.tasks -= LMcounter;
    if (game.resources.tasks <= 0) { game.resources.tasks = 0; }
    LMcounter = 0;
    sounds.LMsound.play();
    console.log('this LUMBERMILL button works');
    journal.buildings.lumbermill.makeFirewood(journal.buildings.lumbermill.firewoodValue);
    journal.buildings.lumbermill.firewoodValue = 0;
    drawLumbermillPage();
    
  });

 // increment the fire wood value
  LMplus.addEventListener('click', function() {
    LMcounter++;
    if (LMcounter > game.resources.tasks) { LMcounter = game.resources.tasks; }
    journal.buildings.lumbermill.firewoodValue = game.resources.subjects * LMcounter;
//    console.log(journal.buildings.lumbermill.firewoodValue++);
    drawLumbermillPage();
    console.log('FW+');
  });

  // decrement the fire wood value
  LMminus.addEventListener('click', function() {
    LMcounter--;
    if (LMcounter < 0) { LMcounter = 0; }
    journal.buildings.lumbermill.firewoodValue = game.resources.subjects * LMcounter;
    drawLumbermillPage();
    console.log(journal.buildings.lumbermill.firewoodValue);
    console.log('FWminus');

  });

  // Draw the lumbermill page on the right side of the journal
  function drawLumbermillPage(){
    if (game.resources.tasks < 1) {
      game.ctx.fillStyle = 'red';
      journal.buildings.granary.granaryValue = 0;
      game.ctx.fillStyle = '#000';
    }

    game.ctx.drawImage(game.BG, 0, 0);
//    journal.update();
    game.update();
    
    // Draw Lumber Mill Label
    game.ctx.fillText(journal.buildings.lumbermill.label, 445, 165);
    
    // Lumber Mill  Intro text
    // Needs to be changed once the LM intro text has been written
    game.ctx.font = '16px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn1, 415, 204);
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn2, 415, 215);
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn3, 415, 226);
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn4, 415, 237);
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn5, 415, 248);
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn6, 415, 259);
    
    game.ctx.font = '20px alagard_by_pix3m-d6awiwp';
    if (game.resources.logs === 0) { game.ctx.fillStyle = 'red'; };
    game.ctx.fillText('Remaining logs: ' + game.resources.logs, 415, 292);
    if (game.resources.firewood === 0) { game.ctx.fillStyle = 'red'; };
    game.ctx.fillText('Total firewood: ' + game.resources.firewood, 415, 312);
    
    game.ctx.fillStyle = '#000';

    // Make Firewood text
    game.ctx.font = '20px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText('Make', 415, 375);
    game.ctx.beginPath();
    game.ctx.moveTo(470, 375);
    game.ctx.lineTo(492, 375);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.lumbermill.firewoodValue, 469, 372);
    game.ctx.fillText('firewood', 500, 375);
    
  };
      

  // ------------------------------------------------------------------------------------------------

  //                                      Apothecary

  // ------------------------------------------------------------------------------------------------

  // Draw the Apothecary page
  Apoth.addEventListener('click', function() {
    console.log('draw Apoth page');
    buttonArray.forEach(function(button) {
      button.style.visibility = 'hidden';
      button.style.zIndex = 0;
    });
    if (Apothcounter > game.resources.tasks) { journal.buildings.apothecary.medicineValue = ((Math.ceil(game.resources.subjects / 10) * game.resources.tasks)); }
    drawApothecaryPage();
    ApothButton.style.visibility = 'visible';
    ApothButton.style.zIndex = 10;
    Apothplus.style.visibility = 'visible';
    Apothminus.style.visibility = 'visible';
    Apothplus.style.zIndex = 10;
    Apothminus.style.zIndex = 10;
  });
 
  // make medicine
  ApothButton.addEventListener('click', function() {
    game.resources.tasks -= Apothcounter;
    if (game.resources.tasks <= 0) { game.resources.tasks = 0; }
    Apothcounter = 0;
    sounds.Apothsounds.play();
    console.log('this APOTHECARY button works');
    journal.buildings.apothecary.makeMedicine(Math.ceil(journal.buildings.apothecary.medicineValue));
    journal.buildings.apothecary.medicineValue = 0;
    drawApothecaryPage();
  });

  // increment the medicine value
  Apothplus.addEventListener('click', function() {
    Apothcounter++;
    if (Apothcounter > game.resources.tasks) { Apothcounter = game.resources.tasks; }
    journal.buildings.apothecary.medicineValue = Math.ceil((game.resources.subjects / 10) * Apothcounter);
    drawApothecaryPage();
    console.log('MEDS+');
  });
    
  // decrement the medicine value
  Apothminus.addEventListener('click', function() {
    Apothcounter--;
    if (Apothcounter < 0) { Apothcounter = 0; }
    journal.buildings.apothecary.medicineValue = Math.ceil((game.resources.subjects / 10) * Apothcounter);
    drawApothecaryPage();
    console.log('MED-');
  });

  // Draw the Apothecary page on the right side of the jounal
  function drawApothecaryPage(){
    if (game.resources.tasks < 1) {
      game.ctx.fillStyle = 'red';
      journal.buildings.granary.granaryValue = 0;
      game.ctx.fillStyle = '#000';
    }
    
    game.ctx.drawImage(game.BG, 0, 0);
//    journal.update();
    game.update();
    
    game.ctx.fillText(journal.buildings.apothecary.label, 445, 165);
    // Apothecary Intro text needs to be fixed when inro text is written
    game.ctx.font = '16px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText(journal.buildings.apothecary.introTextLn1, 415, 204);
    game.ctx.fillText(journal.buildings.apothecary.introTextLn2, 415, 215);
    game.ctx.fillText(journal.buildings.apothecary.introTextLn3, 415, 226);
    game.ctx.fillText(journal.buildings.apothecary.introTextLn4, 415, 237);
    game.ctx.fillText(journal.buildings.apothecary.introTextLn5, 415, 248);
    
    game.ctx.font = '20px alagard_by_pix3m-d6awiwp';
    if (game.resources.herbs === 0) { game.ctx.fillStyle = 'red'; };
    game.ctx.fillText('Remaining herbs: ' + game.resources.herbs, 415, 292);
    if (game.resources.medicine === 0) { game.ctx.fillStyle = 'red'; };
    game.ctx.fillText('Total medicine: ' + game.resources.medicine, 415, 312);

    game.ctx.fillStyle = '#000';
    
    // create medicine text
    game.ctx.font = '19px alagard_by_pix3m-d6awiwp';
    game.ctx.fillText('Create', 415, 375);
    game.ctx.beginPath();
    game.ctx.moveTo(475, 375);
    game.ctx.lineTo(494, 375);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.apothecary.medicineValue, 481, 372);
    game.ctx.fillText('medicine', 500, 375);
  
  };

  
  // ------------------------------------------------------------------------------------------------

  //                                      Next Day Button

  // ------------------------------------------------------------------------------------------------

  // Bind event listener to the ink well, the main mechanism for moving tot he next day
  nextDayButton.addEventListener('click', function() {
    if (game.day >= 90) {
      sounds.mainLoopMP3.pause();
    }
    if (game.resources.subjects <= 0) {
      for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.visibility = 'hidden';
        buttonArray[i].style.zIndex = 0;
      };
      game.clear();
      gameOver.draw();
    } else if (game.day >= 90) {
      for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.visibility = 'hidden';
        buttonArray[i].style.zIndex = 0;
      };
      game.clear();
      victory.draw();
    } else {
      game.day++;
      journal.depleteResouces();
      disaster.rollDisaster();
      journal.buildings.scroll.writeReport();
      console.log('next day!');
      sounds.pageTurn.play();
      game.resources.tasks = 3;
      for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.visibility = 'hidden';
        buttonArray[i].style.zIndex = 0;
      };
      game.ctx.drawImage(game.BG, 0, 0);
      game.update();
    }

    
  });


  // ------------------------------------------------------------------------------------------------

  //                                      Scroll

  // ------------------------------------------------------------------------------------------------

  // Bind event to the close scroll button
  closeScrollButton.addEventListener('click', function() {
    openScroll.style.zIndex = 0;
    openScroll.style.visibility = 'hidden';
    closeScrollButton.style.zIndex = 0;
    closeScrollButton.style.visibility = 'hidden';
    rawMats.style.visibility = 'hidden';
    consumables.style.visibility = 'hidden';
  });


  // ------------------------------------------------------------------------------------------------

  //                                      Debugging 

  // ------------------------------------------------------------------------------------------------

  // Debugging tool, show x and y on click
  game.canvas.addEventListener('mousedown', getPosition, false);

  // callback for the event listener that is bound to the canvas
  function getPosition(event) {
    
    // if statement logic goes in here to trigger the text on the right page of journal
    var x = event.x;
    var y = event.y;
    x -= game.canvas.offsetLeft;
    y -= game.canvas.offsetTop;
    
    console.log(x, y); 
    
};


// ------------------------------------------------------------------------------------------------

//                                      Run the Game!!! 

// ------------------------------------------------------------------------------------------------
startGame();
//})();