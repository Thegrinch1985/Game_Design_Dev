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
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let mario;
let platforms;
let donk;

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
let marioSpeed = 1.5;
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

  this.load.image('fire1', 'assets/115.png');
  this.load.image('fire2', 'assets/116.png');
  this.load.image('fire3', 'assets/118.png');
  this.load.image('fire4', 'assets/119.png');


  this.load.image('Barrel', 'assets/113.png');


  //Donkey Kong 
  this.load.image('DK1', 'assets/34.png');
  this.load.image('DK2', 'assets/35.png');
  this.load.image('DK3', 'assets/36.png');
  this.load.image('DK4', 'assets/37.png');
  this.load.image('DK5', 'assets/37.png');
  this.load.image('DK6', 'assets/38.png');
  this.load.image('DK7', 'assets/41.png');
  this.load.image('DK8', 'assets/42.png');

  //Ladders 
  this.load.image('BigLadder', 'assets/Ladder.png');
  this.load.image('SmallLadder', 'assets/Ladder.png');

  //Barrels

  this.load.image('B1', 'assets/145.png');
  this.load.image('B2', 'assets/146.png');
  this.load.image('B3', 'assets/147.png');
  this.load.image('B4', 'assets/148.png');
  this.load.image('B5', 'assets/149.png');


  //Characters
  this.load.spritesheet('mario', 'assets/mario.png', {
    frameWidth: 16,
    frameHeight: 16
  });
  this.load.spritesheet('DK', 'assets/DonkeyKongSprites.png', {
    frameWidth: 48,
    frameHeight: 48
  });
  this.load.spritesheet('Princess', 'assets/DonkeyKongSprites.png', {
    frameWidth: 32,
    frameHeight: 48
  });
  this.load.spritesheet('FireBin', 'assets/DonkeyKongSprites2.png', {
    frameWidth: 16,
    frameHeight: 31
  });
  this.load.spritesheet('Barrels', 'assets/DonkeyKongSprites.png', {
    frameWidth: 32,
    frameHeight: 48
  });
  //this.load.spritesheet('DK', 'assets/DKS.png', 32, 48, 13);
  //this.load.image('donk', 'assets/dk.png');

 //
  //this.load.image('treasure', 'assets/treasure.png');
};


// executed once, after assets were loaded
function create() {

  this.data.set('lives', 3);
  this.data.set('level', 1);
  this.data.set('High Score', 2000);

  var text = this.add.text(200, 15, '', { font: '12px Courier', fill: '#00ff00' });

  text.setText([
      'Level: ' + this.data.get('level'),
      'Lives: ' + this.data.get('lives'),
      'Score: ' + this.data.get('score')
  ]);
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
 

  ladder1234 =this.physics.add.sprite(135,340,'BigLadder');
  ladder1234.setBounce(0.2);
  ladder1234.setCollideWorldBounds(true);
  this.physics.add.collider(ladder1234, platforms);


  //bARRELS

  
  Barrelling =this.physics.add.sprite(100,55,'B5');
  Barrelling.setBounce(0.2);
  Barrelling.setCollideWorldBounds(true);
  this.physics.add.collider(  Barrelling, platforms);

  this.anims.create({
    key: 'play4',
    frames: [
        { key: 'B1' },
        { key: 'B2' },
        { key: 'B3' },
        { key: 'B4' , duration: 50 }
    ],
    frameRate: 8,
    repeat: -1
  });
  Barrelling.play('play4');


  //Mario
  mario = this.physics.add.sprite(45, 345, 'mario', 0);
  mario.setBounce(0.2);
  mario.setCollideWorldBounds(true);
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('mario', {
      start: 8,
      end: 13
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('mario', {
      start: 1,
      end: 6
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [{
      key: 'mario',
      frame: 0
    }],
    frameRate: 20
  });


  this.physics.add.collider(mario, platforms);


//Donkey Kong Images 

  DK = this.physics.add.sprite(50, 55, 'DK1');
  DK.setBounce(0.2);
  DK.setCollideWorldBounds(true);
  this.physics.add.collider(DK, platforms);

  this.anims.create({
    key: 'play1',
    frames: [
        { key: 'DK1' },
        { key: 'DK2' },
        { key: 'DK3' },
        { key: 'DK4'},
        { key: 'DK5' },
        { key: 'DK6' },
        { key: 'DK7' },
        { key: 'DK8' , duration: 50 }
    ],
    frameRate: 3,
    repeat: -1
});
DK.play('play1')

//Princess Actions 
    this.anims.create({
        key: 'play',
        frames: this.anims.generateFrameNumbers('Princess', {
          start: 0,
          end: 3
        }),
        frameRate: 1,
        repeat: -1
    });
    Princess = this.physics.add.sprite(150, 55, 'Princess',0);
    Princess.setBounce(0.2);
    Princess.setCollideWorldBounds(true);
    this.physics.add.collider(Princess, platforms);
    Princess.play('play');
    
 //Fire
 this.anims.create({
  key: 'play2',
  frames: [
      { key: 'fire1' },
      { key: 'fire2' },
      { key: 'fire3' },
      { key: 'fire4', duration: 50 }
  ],
  frameRate: 8,
  repeat: -1
});
    fire1 = this.physics.add.sprite(5, 345, 'fire1');
    fire1.setBounce(0.2);
    fire1.setCollideWorldBounds(true);
    this.physics.add.collider(fire1, platforms);
    fire1.play('play2');
    
    //Barrell
    Barrel = this.physics.add.sprite(0, 0, 'Barrel');
    Barrel.setBounce(0.2);
    Barrel.setCollideWorldBounds(true);
    this.physics.add.collider(Barrel, platforms);


  // Mario
  //player = this.physics.add.sprite(5, 345, 'player');
  //this.player = this.physics.add.sprite(5,210, 'player');
  //Physics
  //player.setBounce(0.2);
  //player.setCollideWorldBounds(true);
  // scale down
  //player.setScale(0.025);
  // player
  //donk = this.add.sprite(160, 40, 'donk');
  // scale down
  //donk.setScale(0.1);


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

  if (cursors.left.isDown) {
    mario.setVelocityX(-75);

    mario.anims.play('left', true);
  } else if (cursors.right.isDown) {
    mario.setVelocityX(75);

    mario.anims.play('right', true);
  } else {
    mario.setVelocityX(0);

    mario.anims.play('turn');
  }

  if (cursors.up.isDown && mario.body.touching.down) {
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