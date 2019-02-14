// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
 
// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 260, // game width
  height: 360, // game height
  scene: gameScene // our newly created scene
};
 
// create the game, and pass it the configuration
let game = new Phaser.Game(config);

// load asset files for our game
gameScene.preload = function() {
 
  // load images
  this.load.image('background', 'assets/Level1-1Stage.png');
  this.load.image('black', 'assets/blot.jpg');
  //Rails
  this.load.image('Rail', 'assets/StagePlatform.jpg');
  this.load.image('Rail1', 'assets/StagePlatform.jpg');
  this.load.image('Rail2', 'assets/StagePlatform.jpg');
  this.load.image('Rail3', 'assets/StagePlatform.jpg');
  this.load.image('Rail4', 'assets/StagePlatform.jpg');
  this.load.image('Rail5', 'assets/StagePlatform.jpg');
  this.load.image('Rail6', 'assets/StagePlatform.jpg');
  this.load.image('Rail7', 'assets/StagePlatform.jpg');
  this.load.image('Rail8', 'assets/StagePlatform.jpg');
  this.load.image('Rail9', 'assets/StagePlatform.jpg');
  this.load.image('Rail10', 'assets/StagePlatform.jpg');
  this.load.image('Rail11', 'assets/StagePlatform.jpg');
  this.load.image('Rail12', 'assets/StagePlatform.jpg');
  //Ladders 
  this.load.image('BigLadder', 'assets/Ladder.png');
  this.load.image('SmallLadder', 'assets/Ladder.png');


  this.load.image('player', 'assets/mario.jpg');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
};
 // some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
gameScene.init = function() {
  this.playerSpeed = 1.5;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}
// executed once, after assets were loaded
gameScene.create = function() {
 
  
   // background
   let bg = this.add.sprite(0, 0, 'black');
   //Rail 1 & 2
   //Bottom to top 
   let r = this.add.sprite(140,260,'Rail');
   let r1 = this.add.sprite(110,260,'Rail2');
    //Rail 3 & 4
    //let r3 = this.add.sprite(55,220,'Rail3');
    let r4 = this.add.sprite(115,220,'Rail4');
     //Rail 5 & 6 
   //let r5 = this.add.sprite(65,180,'Rail5');
   let r6 = this.add.sprite(150,180,'Rail6');
    //Rail 7 & 8 
    let r5 = this.add.sprite(115,140,'Rail4');
    //let r8 = this.add.sprite(140,140,'Rail8');
     //Rail 9 & 10 
     let r7 = this.add.sprite(150,100,'Rail6')
    let r9 = this.add.sprite(220,70,'Rail4');

    //Ladders 1 
     let Ladder1 = this.add.sprite(115,85,'BigLadder')
     let Ladder2 = this.add.sprite(115,70,'SmallLadder');
     let Ladder22 = this.add.sprite(115,50,'SmallLadder');
         //Ladders 2
         let Ladder3 = this.add.sprite(95,85,'BigLadder')
         let Ladder4 = this.add.sprite(95,70,'SmallLadder');
         let Ladder23 = this.add.sprite(95,50,'SmallLadder');
         //Ladder 3 
         let Ladder5= this.add.sprite(135,85,'SmallLadder');
   //let r9= this.add.sprite(65,100,'Rail9');
   //let r10 = this.add.sprite(150,100,'Rail10');
    //Rail 11 & 12 
    //let r11 = this.add.sprite(55,60,'Rail11');
    //let r12 = this.add.sprite(140,660,'Rail12');
  // change origin to the top-left of the sprite
  bg.setOrigin(0,0);
  this.enemies = this.add.group({
    key: 'dragon',
    repeat: 5,
    setXY: {
      x: 110,
      y: 100,
      stepX: 80,
      stepY: 20
    }

  });
   // scale enemies
   Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);


  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
 
  // scale down
  this.player.setScale(0.050);



    // goal
    this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(0.6);
}

// executed on every frame (60 times per second)
gameScene.update = function() {
 
// check for active input
if (this.input.activePointer.isDown) {

  // player walks
  this.player.x += this.playerSpeed;
}
  // enemy movement and collision
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++) {

    // move enemies
    enemies[i].y += enemies[i].speed;

    // reverse movement if reached the edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }

    // enemy collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      this.gameOver();
      break;
    }
  }



};

 // set speeds
 Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
  enemy.speed = Math.random() * 2 + 1;
}, this);
// end the game
gameScene.gameOver = function() {
 
    // restart the scene
    this.scene.restart();
}