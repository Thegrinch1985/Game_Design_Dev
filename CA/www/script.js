// create a new scene named "Game"
//let gameScene = new Phaser.Scene('Game');

// our game's configuration
var config = {
  type: Phaser.AUTO,
  width: 300,
  height: 800,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let player;
let platforms;
let donk;

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
let playerSpeed = 1.5;
let enemyMaxY = 280;
let enemyMinY = 80;
let gameOver = false;


// create the game, and pass it the configuration
let game = new Phaser.Game(config);



// load asset files for our game
function preload() {

  // load images
  //this.load.image('background', 'assets/Level1-1Stage.png');
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
    //Characters
  this.load.spritesheet('mario', 'assets/mario.png', { frameWidth: 4800, frameHeight: 4800 });
  this.load.spritesheet('DK', 'assets/DKS.png', 32,  48, 13);
  this.load.image('donk', 'assets/dk.png');
  //this.load.image('treasure', 'assets/treasure.png');
};


// executed once, after assets were loaded
function create() {
  platforms = this.physics.add.staticGroup();
  // background
  let bg = this.add.sprite(200, 400, 'black');
  //Rails
  //Bottom to Top
  platforms.create(100, 400, 'Rail').setScale(2).refreshBody();
  //Bottom
  platforms.create(55, 340, 'Rail2');
  platforms.create(145, 340, 'Rail3');
  //2nd From bottom
  platforms.create(190, 280, 'Rail4');
  platforms.create(125, 280, 'Rail5');
  //3rd from bottom
  platforms.create(55, 220, 'Rail6');
  platforms.create(155, 220, 'Rail7');
  //4th 
  platforms.create(190, 160, 'Rail8');
  platforms.create(125, 160, 'Rail9');
  //5th
  platforms.create(55, 80, 'Rail10');
  platforms.create(155, 80, 'Rail11');

  //Ladders 1 
  let Ladder1 = this.add.sprite(115, 85, 'BigLadder')
  let Ladder2 = this.add.sprite(115, 70, 'SmallLadder');
  let Ladder22 = this.add.sprite(115, 50, 'SmallLadder');
  //Ladders 2
  let Ladder3 = this.add.sprite(95, 85, 'BigLadder')
  let Ladder4 = this.add.sprite(95, 70, 'SmallLadder');
  let Ladder23 = this.add.sprite(95, 50, 'SmallLadder');
  //Ladder 3 
  let Ladder5 = this.add.sprite(135, 85, 'SmallLadder');

  //Bottom Level Ladders
  let Ladder6 = this.add.sprite(115, 380, 'SmallLadder');

  let Ladder11 = this.add.sprite(195, 340, 'BigLadder')
  let Ladder12 = this.add.sprite(195, 360, 'SmallLadder');
  let Ladder13 = this.add.sprite(195, 380, 'SmallLadder');
//Mario 
  mario = this.physics.add.sprite(5, 345, 'mario');
  mario.setBounce(0.2);
  mario.setCollideWorldBounds(true);
  
  this.physics.add.collider(mario, platforms);

  DK = this.physics.add.sprite(5, 55, 'DK');
  DK.setBounce(0.2);
  DK.setCollideWorldBounds(true);
  
  this.physics.add.collider(DK, platforms);

  
  // Mario
  //player = this.physics.add.sprite(5, 345, 'player');
  //this.player = this.physics.add.sprite(5,210, 'player');
  //Physics
  //player.setBounce(0.2);
  //player.setCollideWorldBounds(true);
  // scale down
  //player.setScale(0.025);
   // player
  donk = this.add.sprite(160, 40, 'donk');
   // scale down
  donk.setScale(0.1);


  //  Player physics properties. Give the little guy a slight bounce.


  bg.setOrigin(0, 0);

  /*
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
*/
cursors = this.input.keyboard.createCursorKeys();
this.physics.add.collider(mario, platforms);
this.physics.add.collider(DK, platforms);

}

// executed on every frame (60 times per second)
function update() {

  if (gameOver) {
    return;
  }
  
  if (cursors.left.isDown)
  {
      mario.setVelocityX(-75);

      //player.anims.play('left', true);
  }

  else if (cursors.right.isDown)
  {
      mario.setVelocityX(75);

      //player.anims.play('right', true);
  }
  else
  {
      mario.setVelocityX(0);

      //player.anims.play('turn');
  }

  if (cursors.up.isDown && mario.body.touching.down)
  {
      mario.setVelocityY(-150);
  }
  // //check for active input
  // if (this.input.activePointer.isDown) {

  //   // player walks
  //   this.player.x += this.playerSpeed;
  // }
  // // enemy movement and collision
  // let enemies = this.enemies.getChildren();
  // let numEnemies = enemies.length;

  // for (let i = 0; i < numEnemies; i++) {

  //   // move enemies
  //   enemies[i].y += enemies[i].speed;

  //   // reverse movement if reached the edges
  //   if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
  //     enemies[i].speed *= -1;
  //   } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
  //     enemies[i].speed *= -1;
  //   }

  // enemy collision
  // if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
  //   this.gameOver();
  //   break;
  // }
}





// // set speeds
// Phaser.Actions.Call(this.enemies.getChildren(), function (enemy) {
//   enemy.speed = Math.random() * 2 + 1;
// }, this);
// // end the game