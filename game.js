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
    this.BG.src = "resources/Screens/DeskJournalandScroll.png";
    this.disaster = false;
    this.turnActive = false;
    this.startScreenActive = true;
    this.indicator = new Image();
    this.indicator.src = "resources/ActionIcons/IndicatorLight.png";
    this.scroll = new Image();
    this.scroll.src = "resources/ActionIcons/scroll.png";
    
    // resouces object
    this.resources = {
      subjects: 300,
      logs: 500,
      firewood: 50,
      ore: 500,
      medicine: 400,
      gold: 500,
      grain: 1000,
      bread: 50,
      tasks: 3,
      swords: 25,
      herbs: 100
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
        console.log("game.draw is working");
      }
    
  };
  
  // 
  Game.prototype.update = function() {
    journal.update();
    console.log('game.update is working');
  };
  
  // Game loop
//  Game.prototype.tick = function() {
//    game.clear();
//    game.update();
//    game.draw();
//    
//  };
    
  // ------------------------------------------------------------------------------------------------

  //                                         Sounds

  // ------------------------------------------------------------------------------------------------
    
  var Sounds = function() {
    this.mainThemeMP3 = new Audio("resources/sounds/DepthsOfWinter1.mp3");
    this.mainLoopMP3 = new Audio("resources/sounds/WinterLoop.mp3");
    this.BShammer = new Audio("resources/sounds/Anvil.mp3");
    this.granary = new Audio("resources/sounds/Granary.mp3");
    this.LMsound = new Audio("resources/sounds/LumberMill.mp3");
    this.Apothsounds = new Audio("resources/sounds/Apothecary.mp3");
    this.pageTurn = new Audio("resources/sounds/PageTurn.mp3");
  }

  // ------------------------------------------------------------------------------------------------

  //                                         Main Menu

  // ------------------------------------------------------------------------------------------------

  /*
      Menu should have game title + instructions on how to begin the game.  
  */

  // Menu class... instantiate and draw to the game to display menu
  var MainMenu = function() {
    this.x = 200;
    this.y = 200;
    this.title = "The Depths of Winter";
    this.enter = "Press Enter to Begin";
    // there might have to be many broken up lines of lore.
    this.lore = "lore lore lore lore lore lore";
    // Need to add the BG image here as a new Image()
    // need to add the BG image src here with the file path as it's property
    this.startScreen = new Image();
    this.startScreen.src = "resources/Screens/StartScreen.png";
  };

  // Should probably be drawn when the page loads
  MainMenu.prototype.draw = function() {
    //Need to draw BG image here onload
//    game.ctx.font = "32px Courier";
//    game.ctx.fillText(this.title, this.x, this.y);
//    game.ctx.font = "16px Courier";
//    game.ctx.fillText(this.enter, this.x + 100, this.y + 50);
//    
    mainMenu.startScreen.onload = function() {
      game.clear();
      game.ctx.drawImage(mainMenu.startScreen, 0 , 0);
      console.log("start image working");
    }
      

  };

  MainMenu.prototype.lore = function() {
    
    game.ctx.filltext(this.lore, game.size.x / 2, game.size.y / 2);
    game.ctx.filltext(this.lore, game.size.x / 2, game.size.y / 2);
    game.ctx.filltext(this.lore, game.size.x / 2, game.size.y / 2);
    game.ctx.filltext(this.lore, game.size.x / 2, game.size.y / 2);
    game.ctx.filltext(this.lore, game.size.x / 2, game.size.y / 2);
    game.ctx.filltext(this.lore, game.size.x / 2, game.size.y / 2);
    game.ctx.filltext(this.lore, game.size.x / 2, game.size.y / 2);
  };

  

  // Name character and name castle should probably have their own screen as well
  
  // -----------------------------------------------------------------------------------------------

  //                                      Game Over

  // ------------------------------------------------------------------------------------------------
  
  var GameOverScreen = function() {
    this.BG = new Image();
    this.BG.src = "resources/Screens/GameOverScreen.png";
  };

  GameOverScreen.prototype.draw = function() {
    game.ctx.drawImage(gameOver.BG, 0, 0);
    console.log("gameOver.draw is working");
  };


  // -----------------------------------------------------------------------------------------------

  //                                      Victory Screen

  // ------------------------------------------------------------------------------------------------
    

  var VictoryScreen = function() {
    this.BG = new Image();
    this.BG.src = "resources/Screens/VictoryScreenGreen.png";
  };

  VictoryScreen.prototype.draw = function() {
    victory.BG.onload = function() {
      game.clear();
      game.ctx.drawImage(victory.BG, 0, 0);
      console.log("victory.draw is working");
    }
  };


  // -----------------------------------------------------------------------------------------------

  //                                      Main Game Loop

  // ------------------------------------------------------------------------------------------------
    var startScreenActive = true;

  function startGame(){
    sounds.mainThemeMP3.play();
    mainMenu.draw();
    var startButton = document.getElementById("startButton");
    startButton.addEventListener("click", function() {
      startButton.style.visibility = "hidden";
      startButton.style.zIndex = -1000;
      playGame(game.day);
    });
    
    
  }; 

  function playGame(day) {
    var people = game.resources.subjects;
    game.turnActive = true;
    game.clear();
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
    
    
    //draw the scroll the screen with the days message
    //scroll.draw(); 
  
  };



  // ------------------------------------------------------------------------------------------------

  //                                         Journal

  // ------------------------------------------------------------------------------------------------

  var Journal = function() {
    this.playerUI = new Image();
    this.playerUI.src = "resources/DeskJournalandScroll.png";
    this.journalArray = [];
    
    // All the building objects... x & y coords + width and height of sprites + strings and methods
    this.buildings = {
      // Blacksmith object
      blacksmith: {
        sprite: 'anvil',
        label: 'Blacksmith',
        x: 172,
        y: 200,
        h: 58,
        w: 99,
        introTextLn1: "Here is where the Blacksmith",
        introTextLn2: "turns your precious ore into ",
        introTextLn3: "swords and armor. It may be ",
        introTextLn4: "useful to arm yourself in",
        introTextLn5: "these hard times.",
        currentArms: game.resources.swords,
        forgeValue: 0,
        armsStatus: "Armed subjects: " + game.resources.swords + "",
        oreStatus: "Remaining ore: " + game.resources.ore + "",
        forgeSwords: function(val) {
          game.resources.swords += val;
          game.resources.ore -= val * 10
          game.resources.tasks -= 1;
        }
      },
      
      // Granary object
      granary: {
        sprite: 'grain',
        label: 'Granary',
        x: 187,
        y: 259,
        h: 81,
        w: 87,
        introTextLn1: "The granary is the main",
        introTextLn2: "source of food for your",
        introTextLn3: "subjects. Feed them well.",
        grainStatus: "Remaining grain: " + game.resources.grain + "",
        breadStatus: "Total bread: " + + game.resources.bread + "",
        granaryValue: 0,
        plusGrain: function(){},
        minusGrain: function(){},
        makeBread: function(val) {
          game.resources.bread += val;
          game.resources.grain -= val * 10;
          game.resources.tasks -= 1;
        }
      },
      
      // Lumbermill object
      lumbermill: {
        sprite: 'lumber',
        label: 'Lumbermill',
        x: 180, 
        y: 342,
        h: 65,
        w: 89,
        introTextLn1: "The winter cold is bitter.",
        introTextLn2: "A well stoked fire will be",
        introTextLn3: "a most welcome ally.",
        logsStatus: "Remaining logs: " + game.resources.logs + "",
        firewoodStatus: "Total firewood: " + + game.resources.firewood + "",
        firewoodValue: 0,
        plusWood: function(){},
        minusWood: function(){},
        makeFirewood: function(val) {
          game.resources.firewood += val;
          game.resources.logs -= val * 10;
          game.resources.tasks -= 1;
        }
      },
      
      // Apothecary object
      apothecary: {
        sprite: 'vial',
        label: 'Apothecary',
        x: 188,
        y: 411,
        h: 78,
        w: 71,
        introTextLn1: "The apothecary can turn",
        introTextLn2: "your herbs into medicine.",
        introTextLn3: "They say health is the",
        introTextLn4: "greatest treasure.",
        herbsStatus: "Remaining herbs: " + game.resources.herbs + "",
        medicineStatus: "Total medicine: " + + game.resources.medicine + "",
        medicineValue: 0,
        plusMedicine: function(){},
        minusMedicine: function(){},
        makeMedicine: function(val) {
          game.resources.medicine += val + 4;
          game.resources.herbs -= val * 10;
          game.resources.tasks -= 1;
        }
      },
      // needs properties!!
      scroll: {
        scrollLabel: "Day " + game.day + " Summary",
        disasterText: function() {
          //if wolves print wolves
          //if blizz print blizz
          //if plague print plague
        },
        oreText: "Ore: " + game.resources.ore,
        swordsText: "Swords: " + game.resources.swords,
        lumberText: "Logs" + game.resources.logs,
        firewoodText: "Firewood: " + game.resources.firewood,
        grainText: "Grain: " + game.resources.grain,
        breadText: "Bread: " + game.resources.bread,
        herbsText: "Herbs: " + game.resources.herbs,
        medicineText: "Medicine: " + game.resources.medicine,
        writeReport: function() {
          // In here we'll fill out a report with our current status
          game.ctx.fillStyle = "#000";
          game.ctx.fillText(journal.buildings.scroll.scrollLabel, 330, 78);
          console.log("report written!");
          
        }
      }
    };
    
  };
  

  Journal.prototype.draw = function() {
    // Draw the journal (the background)
    game.ctx.drawImage(this.playerUI, 0, 0);
  };
  
  Journal.prototype.update = function() {
    
    // Set Font
    game.ctx.font = "16px Courier";
    
    // Blacksmith label
    game.ctx.fillText(this.buildings.blacksmith.label, this.buildings.blacksmith.x + this.buildings.blacksmith.w, this.buildings.blacksmith.y + (this.buildings.blacksmith.h / 2));
    
    // Granary label
    game.ctx.fillText(this.buildings.granary.label, this.buildings.granary.x + this.buildings.granary.w, this.buildings.granary.y + (this.buildings.granary.h / 2));
    
    // Lumbermill label
    game.ctx.fillText(this.buildings.lumbermill.label, this.buildings.lumbermill.x + this.buildings.lumbermill.w, this.buildings.lumbermill.y + (this.buildings.lumbermill.h / 2));
    
    // Apothecary label
    game.ctx.fillText(this.buildings.apothecary.label, this.buildings.apothecary.x + this.buildings.apothecary.w, this.buildings.apothecary.y + (this.buildings.apothecary.h / 2));
    
    // Top left of journal day status 
    game.ctx.fillText("Day " + String(game.day) + " of " + String(game.totalDays), 225, 160);
    
    game.ctx.font = "22px Courier";
    game.ctx.fillStyle = "#fff";
    
    // Bottom right of screen (remainin subjects)
    game.ctx.fillText("Subjects remaining: " + game.resources.subjects, 480, 561);
    game.ctx.fillText("Tasks remaining: " + game.resources.tasks, 40, 561);
    game.ctx.fillStyle = "#000";
    
    if (game.resources.tasks <= 0) {
      game.ctx.drawImage(game.indicator, 552, -34);
      game.ctx.fillStyle = "#fff";
      game.ctx.fillText("Click the ink well to", 286, 33);
      game.ctx.fillText("continue to the next day.", 286, 53);
      buttonArray[12].style.zIndex = 10;
      buttonArray[12].style.visibility = "visible";
      
      game.ctx.fillStyle = "#000";
    };
    
    
  };
      
  
  // ------------------------------------------------------------------------------------------------
  
  // !Disaster class... might need to be a part of the player class and subtract from Player values!
  var Disaster = function() {
    var killedByWolves = Math.ceil(Math.random() * (5 - 1) + 1);
    var killedByBlizzard = Math.ceil(Math.random() * (20 - 10) + 10);
    var killedByPlague = Math.ceil(Math.random() * (50 - 20) + 20);
    
    // Disaster 1
    this.wolves = function() {
      console.log('The village was raided by wolves during the night! ' + killedByWolves + ' did not survive...');
    };
    
    // Disaster 2
    this.blizzard = function() {
      console.log('The village was hit by a blizzard during the night! ' + killedByBlizzard + ' did not survive...');
    };
                  
    // Disaster 3
    this.plague = function() {
      console.log('The village was hit by a bout of plague! ' + killedByPlague + ' did not survive...');
    };
    
  };

  Disaster.prototype.rollDisaster = function() {
    var roll = Math.ceil(Math.random() * 3);
  };

  
  // ------------------------------------------------------------------------------------------------

  //                          Globals and functions to start the game

  // ------------------------------------------------------------------------------------------------

  /* Call the actual game function */
  
  // Instantiate all the objects
  var game = new Game();
  //  var player = new Player(game);
  var journal = new Journal();
  var mainMenu = new MainMenu();
  var victory = new VictoryScreen();
  var gameOver = new GameOverScreen();
  var sounds = new Sounds();
  var openScroll = document.getElementById("openScroll");

  // All the buttons
  var BSButton = document.getElementById("BSButton");
  var LMButton = document.getElementById("LMButton");
  var GranButton = document.getElementById("GranButton");
  var ApothButton = document.getElementById("ApothButton");
  var plusButton = document.getElementById("plus");
  var minusButton = document.getElementById("minus");
  var BSplus = document.getElementById("BSplus");
  var BSminus = document.getElementById("BSminus");
  var Granplus = document.getElementById("Granplus");
  var Granminus = document.getElementById("Granminus");
  var LMplus = document.getElementById("LMplus");
  var LMminus = document.getElementById("LMminus");
  var Apothplus = document.getElementById("Apothplus");
  var Apothminus = document.getElementById("Apothminus");
  var nextDayButton = document.getElementById("nextDayButton");
  var closeScrollButton = document.getElementById("closeScroll");
  var buttonArray = [];
  
  // Push all the button dom elements into a neat array
  buttonArray.push(BSButton, GranButton, LMButton, ApothButton, BSplus, BSminus, Granplus, Granminus, LMplus, LMminus, Apothplus, Apothminus, nextDayButton);

  // Bind event to the close scroll button
  closeScrollButton.addEventListener("click", function() {
    openScroll.style.zIndex = 0;
    openScroll.style.visibility = "hidden";
    closeScrollButton.style.zIndex = 0;
    closeScrollButton.style.visibility = "hidden";
  });
  

  // Bind event listener to the ink well, the main mechanism for moving tot he next day
  buttonArray[12].addEventListener("click", function() {
    openScroll.style.zIndex = 1000;
    openScroll.style.visibility = "visible";
    
    closeScrollButton.style.zIndex = 1000;
    closeScrollButton.style.visibility = "visible";
    journal.buildings.scroll.writeReport();
    console.log("next day!");
    sounds.pageTurn.play();
    game.day++;
    game.resources.tasks = 3;
    for (var i = 0; i < buttonArray.length; i++) {
      buttonArray[i].style.visibility = "hidden";
      buttonArray[i].style.zIndex = 0;
    };
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
    
    if (game.resources.subjects <= 0) {
      game.clear();
    gameOver.draw();
    }
  });

  game.canvas.addEventListener("mousedown", getPosition, false);

  // Draw the Blacksmith page on the right side of the journal
  function drawBlacksmithPage() {
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
    
    // Label at top of page
    game.ctx.fillText(journal.buildings.blacksmith.label, 429, 158);

    // Blacksmith Intro text
    game.ctx.font = "12px Courier";
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn1, 422, 204);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn2, 415, 213);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn3, 417, 222);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn4, 415, 231);
    game.ctx.fillText(journal.buildings.blacksmith.introTextLn5, 415, 240);

    // Arms and Ore status
    game.ctx.font = "14px Courier";
    game.ctx.fillText("Remaining ore: " + game.resources.ore, 415, 292);
    game.ctx.fillText("Armed subjects: " + game.resources.swords, 415, 312);

    // turn the forge value into a string so that it can be printed to the page
    journal.buildings.blacksmith.forgeValue.toString();

    // Forge swords text
    game.ctx.font = "18px Courier";
    game.ctx.fillText("Forge", 415, 367);
    game.ctx.beginPath();
    game.ctx.moveTo(470, 368);
    game.ctx.lineTo(490, 368);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.blacksmith.forgeValue, 483, 359);
    game.ctx.fillText("swords", 500, 367);

  };

  // Draw the Granary page on the right side of the journal
  function drawGranaryPage() {
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
    
    // Granary label
    game.ctx.fillText(journal.buildings.granary.label, 429, 158);
    
    // Granary Intro text
    // Needs to be change to journal.buildings.granary.introTextLnX once it is written
    game.ctx.font = "12px Courier";
    game.ctx.fillText(journal.buildings.granary.introTextLn1, 422, 204);
    game.ctx.fillText(journal.buildings.granary.introTextLn2, 415, 213);
    game.ctx.fillText(journal.buildings.granary.introTextLn3, 417, 222);
    game.ctx.font = "14px Courier";
    game.ctx.fillText("Remaining grain: " + game.resources.grain, 415, 292);
    game.ctx.fillText("Total bread: " + game.resources.bread, 415, 312);

    // Make bread text
    game.ctx.font = "18px Courier";
    game.ctx.fillText("Bake", 415, 367);
    game.ctx.beginPath();
    game.ctx.moveTo(470, 368);
    game.ctx.lineTo(490, 368);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.granary.granaryValue, 483, 359);
    game.ctx.fillText("bread", 500, 367);


  };
  
  // Draw the lumbermill page on the right side of the journal
  function drawLumbermillPage(){
    
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
    
    // Draw Lumber Mill Label
    game.ctx.fillText(journal.buildings.lumbermill.label, 429, 158);
    
    // Lumber Mill  Intro text
    // Needs to be changed once the LM intro text has been written
    game.ctx.font = "12px Courier";
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn1, 422, 204);
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn2, 415, 213);
    game.ctx.fillText(journal.buildings.lumbermill.introTextLn3, 417, 222);
    game.ctx.font = "14px Courier";
    game.ctx.fillText("Remaining logs: " + game.resources.logs, 415, 292);
    game.ctx.fillText("Total firewood: " + game.resources.firewood, 415, 312);

    // Make Firewood text
    game.ctx.font = "13px Courier";
    game.ctx.fillText("Make", 415, 367);
    game.ctx.beginPath();
    game.ctx.moveTo(470, 368);
    game.ctx.lineTo(490, 368);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.lumbermill.firewoodValue, 483, 359);
    game.ctx.fillText("firewood", 500, 367);
    
  };

  
  // Draw the Apothecary page on the right side of the jounal
  function drawApothecaryPage(){
    game.ctx.drawImage(game.BG, 0, 0);
    game.update();
    game.ctx.fillText(journal.buildings.apothecary.label, 429, 158);
    // Apothecary Intro text needs to be fixed when inro text is written
    game.ctx.font = "12px Courier";
    game.ctx.fillText(journal.buildings.apothecary.introTextLn1, 422, 204);
    game.ctx.fillText(journal.buildings.apothecary.introTextLn2, 415, 213);
    game.ctx.fillText(journal.buildings.apothecary.introTextLn3, 417, 222);
    game.ctx.fillText(journal.buildings.apothecary.introTextLn4, 415, 231);
    
    game.ctx.font = "14px Courier";
    
    game.ctx.fillText("Remaining herbs: " + game.resources.herbs, 415, 292);
    game.ctx.fillText("Total medicine: " + game.resources.medicine, 415, 312);

    // create medicine text
    game.ctx.font = "13px Courier";
    game.ctx.fillText("Create", 415, 367);
    game.ctx.beginPath();
    game.ctx.moveTo(470, 368);
    game.ctx.lineTo(490, 368);
    game.ctx.stroke();
    game.ctx.fillText(journal.buildings.apothecary.medicineValue, 483, 359);
    game.ctx.fillText("medicine", 500, 367);
  
  };

  var clickCountA = 0;
  var clickCountB = 0;

  buttonArray.forEach(function(button) {
    button.style.visibility = "hidden";
    button.style.zIndex = 0;
  });
  

  // callback for the event listener that is bound to the canvas
  function getPosition(event) {
    
    console.log(game.resources.tasks);
    
    // if statement logic goes in here to trigger the text on the right page of journal
    var x = event.x;
    var y = event.y;

    x -= game.canvas.offsetLeft;
    y -= game.canvas.offsetTop;
    
    console.log(x, y);
    
    
    console.log(game.resources.tasks);
    
    
    // If blacksmith icon is clicked, draw info to the right page
    if (x > journal.buildings.blacksmith.x && x < journal.buildings.blacksmith.x + journal.buildings.blacksmith.w && y > journal.buildings.blacksmith.y && y < journal.buildings.blacksmith.y + journal.buildings.blacksmith.h) {
    
//    game.resources.tasks -= 1;
    drawBlacksmithPage();  
      
//    clickCountA++;
//      
//    console.log("clickCountA = " + clickCountA);
//      
//    if (clickCountA > 1) {
//      buttonArray[4].removeEventListener("click", a);
//      clickCountA = 0;
//    }
      
    buttonArray.forEach(function(button) {
      button.style.visibility = "hidden";
      button.style.zIndex = 0;
    });

    buttonArray[0].style.visibility = "visible";
    buttonArray[0].addEventListener("click", function() {
      sounds.BShammer.play();
      console.log("this BLACKSMITH button works");
      journal.buildings.blacksmith.forgeSwords(journal.buildings.blacksmith.forgeValue);
      drawBlacksmithPage();
      console.log(game.resources.ore);
      console.log(game.resources.swords);
    });

    buttonArray[4].style.visibility = "visible";
    buttonArray[5].style.visibility = "visible";
    buttonArray[4].style.zIndex = 10;
    buttonArray[5].style.zIndex = 10;

    // Increment forgeValue when the + button is clicked
    buttonArray[4].addEventListener("click", function() {
      console.log("BSplus");
      journal.buildings.blacksmith.forgeValue++;
      game.resources.ore -= 10;
      game.resources.swords += 1;
      drawBlacksmithPage();
      console.log(journal.buildings.blacksmith.forgeValue);
      
    });

    // Decrement forgeValue when the - button is clicked
    buttonArray[5].addEventListener("click", function () {
      console.log("BSminus");
      journal.buildings.blacksmith.forgeValue--;
      drawBlacksmithPage();
      console.log(journal.buildings.blacksmith.forgeValue);
  
      if (journal.buildings.blacksmith.forgeValue < 1) { 
        journal.buildings.blacksmith.forgeValue = 0;
        drawBlacksmithPage();
      }
      game.ctx.fillText(journal.buildings.blacksmith.forgeValue, 483, 359);
    });
    
    };
      
    // If granary icon is clicked, draw info to the right page
    if (x > journal.buildings.granary.x && x < journal.buildings.granary.x + journal.buildings.granary.w && y > journal.buildings.granary.y && y < journal.buildings.granary.y + journal.buildings.granary.h) {
      
    drawGranaryPage();
      
//    clickCountB++;
//      
//    console.log("clickCountB = " + clickCountB);
//      
//    if (clickCountB > 1 || clickCountA > 1) {
//      buttonArray[4].removeEventListener("click", b);
//      
//      clickCountB = 0;
//    }
      
    buttonArray.forEach(function(button) {
      button.style.visibility = "hidden";
      button.style.zIndex = 0;
    });

    buttonArray[1].style.visibility = "visible";
    buttonArray[1].style.zIndex = "60";
    buttonArray[1].addEventListener("click", function() {
      sounds.granary.play();
      console.log("this GRANARY button works");
      journal.buildings.granary.makeBread(journal.buildings.granary.granaryValue);
      drawGranaryPage();
    });

    buttonArray[6].style.visibility = "visible";
    buttonArray[7].style.visibility = "visible";
    buttonArray[6].style.zIndex = 10;
    buttonArray[7].style.zIndex = 10;

    buttonArray[6].addEventListener("click", function b() {
      console.log("GRplus");
      journal.buildings.granary.granaryValue + 1;
      game.resources.grain -= 20;
      game.resources.bread += 10;
      console.log(journal.buildings.granary.granaryValue++);
      drawGranaryPage();
    });
      
    buttonArray[7].addEventListener("click", function () {
      console.log("GRminus");
      journal.buildings.granary.granaryValue--;
      drawGranaryPage();
      console.log(journal.buildings.granary.granaryValue);
  
      if (journal.buildings.granary.granaryValue < 1) { 
        journal.buildings.granary.granaryValue = 0;
        drawGranaryPage();
      }
      game.ctx.fillText(journal.buildings.granary.granaryValue, 483, 359);
    });
      
    };
    
    // If Lumbermill icon is clicked, draw info to the right page
    if (x > journal.buildings.lumbermill.x && x < journal.buildings.lumbermill.x + journal.buildings.lumbermill.w && y > journal.buildings.lumbermill.y && y < journal.buildings.lumbermill.y + journal.buildings.lumbermill.h){
      
    drawLumbermillPage();
      
    buttonArray.forEach(function(button) {
      button.style.visibility = "hidden";
      button.style.zIndex = 0;
    });

    buttonArray[2].style.visibility = "visible";
    buttonArray[2].style.zIndex = "60";
    buttonArray[2].addEventListener("click", function() {
      sounds.LMsound.play();
      console.log("this LUMBERMILL button works");
      journal.buildings.lumbermill.makeFirewood(journal.buildings.lumbermill.firewoodValue);
      drawLumbermillPage();
      
    });
      
    buttonArray[8].style.visibility = "visible";
    buttonArray[9].style.visibility = "visible";
    buttonArray[8].style.zIndex = 10;
    buttonArray[9].style.zIndex = 10;

    buttonArray[8].addEventListener("click", function() {
      console.log("FWplus");
      journal.buildings.lumbermill.firewoodValue + 1;
      game.resources.logs -= 10;
      game.resources.firewood += 3;
      console.log(journal.buildings.lumbermill.firewoodValue++);
      drawLumbermillPage();
    });
      
    buttonArray[9].addEventListener("click", function() {
      console.log("FWminus");
      journal.buildings.lumbermill.firewoodValue--;
      drawLumbermillPage();
      console.log(journal.buildings.lumbermill.firewoodValue);
  
      if (journal.buildings.lumbermill.firewoodValue < 1) { 
        journal.buildings.lumbermill.firewoodValue = 0;
        drawLumbermillPage();
      }
      game.ctx.fillText(journal.buildings.lumbermill.firewoodValue, 483, 359);
    });
      
    };
    
    // If granary icon is clicked, draw info to the right page
    if (x > journal.buildings.apothecary.x && x < journal.buildings.apothecary.x + journal.buildings.apothecary.w && y > journal.buildings.apothecary.y && y < journal.buildings.apothecary.y + journal.buildings.apothecary.h){
      
    drawApothecaryPage();
      
    buttonArray.forEach(function(button) {
      button.style.visibility = "hidden";
      button.style.zIndex = 0;
    });

    buttonArray[3].style.visibility = "visible";
    buttonArray[3].style.zIndex = "60";
    buttonArray[3].addEventListener("click", function() {
      sounds.Apothsounds.play();
      console.log("this APOTHECARY button works");
      journal.buildings.apothecary.makeMedicine(journal.buildings.apothecary.medicineValue);
      drawApothecaryPage();
    });
      
    buttonArray[10].style.visibility = "visible";
    buttonArray[11].style.visibility = "visible";
    buttonArray[10].style.zIndex = 10;
    buttonArray[11].style.zIndex = 10;

    buttonArray[10].addEventListener("click", function() {
      console.log("FWplus");
      journal.buildings.apothecary.medicineValue + 1;
      game.resources.medicine += 1;
      game.resources.herbs -= 10;
      console.log(journal.buildings.apothecary.medicineValue++);
      drawApothecaryPage();
    });
      
    buttonArray[11].addEventListener("click", function() {
      console.log("FWminus");
      journal.buildings.apothecary.medicineValue--;
      drawApothecaryPage();
      console.log(journal.buildings.apothecary.medicineValue);
  
      if (journal.buildings.apothecary.medicineValue < 1) { 
        journal.buildings.apothecary.medicineValue = 0;
        drawApothecaryPage();
      }
      game.ctx.fillText(journal.buildings.apothecary.medicineValue, 483, 359);
    });
      
    };
    
};

game.canvas.style.cursor = "url(resources/ActionIcons/QuillCursor2.png), auto";

startGame();

//})();